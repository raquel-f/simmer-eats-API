import { Stripe } from "stripe";
import { DELIVERY_STATUS } from '../constants/index.js';

// models
import FoodItem from "../models/foodItem.js";
import ShoppingCart from "../models/cart.js";
import Delivery from "../models/delivery.js";

// simulate delays
async function stall(stallTime = 3000) { await new Promise(resolve => setTimeout(resolve, stallTime)); }

// get food product name by its ID
const getProductName = async (id) => {
    let foodItem = await FoodItem.findById(id);
    return foodItem.name;
}

// update shopping cart and create a new delivery
const handleCheckoutSessionCompleted = async (session) => {
    const sessionID = session.id;
    const paymentID = session.payment_intent;

    // get shopping cart matching checkout session
    const shoppingCart = await ShoppingCart.findOne({ stripeCheckoutID: sessionID });

    // create delivery data
    const deliveryData = {
        products: shoppingCart.products,
        user: shoppingCart.user,
        payment: paymentID
    };
    const newDelivery = new Delivery(deliveryData);
    await newDelivery.save();

    // empty user cart
    await ShoppingCart.updateOne(
        { stripeCheckoutID: sessionID },
        { products: [], stripeCheckoutID: '', lastUpdated: Date.now() },
        { new: true }
    );
}

// update delivery status when payment is received
const handleReceivedPayment = async (payment) => {
    const paymentID = payment.id;

    // simulate payment delay
    await stall(5000);

    // find delivery for the payment id and update it
    await Delivery.findOneAndUpdate(
        { payment: paymentID },
        { status: DELIVERY_STATUS.Confirmed },
        { new: true }
    );
}

// ----- handlers for stripe payment routes -----

// create a new stripe checkout session
export const createCheckout = async (req, res) => {

    // get products list from cart
    const products = req.body;

    // setup stripe
    const stripe = Stripe(process.env.STRIPE_SECRET);

    try {

        // add items from shopping cart to list
        let lineItems = [];

        for (const prod of products) {
            // create new line item
            let newItem = {
                quantity: prod.quantity,
                price_data: {
                    currency: 'usd',
                    unit_amount: (prod.totalPrice / prod.quantity) * 100, // TODO IMPROVEMENT OPPORTUNITY
                    product_data: { name: await getProductName(prod.product) }
                }
            };

            // add line item to list
            lineItems.push(newItem);
        }

        // create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            // TODO CHANGE
            success_url: 'http://localhost:3000/delivery?from=stripe',
            cancel_url: 'http://localhost:3000/cart'
        });

        // update shopping cart with checkout session ID
        const userID = req.userId;
        await ShoppingCart.findOneAndUpdate(
            { user: userID },
            { stripeCheckoutID: session.id, lastUpdated: Date.now() },
            { new: true }
        );

        // send redirect for stripe payment
        res.status(200).json({ redirect: session.url });

    } catch (error) {
        // send error
        res.status(400).json({ message: error.message });
    }
};

// handle received web hooks from Stripe
export const handleWebhooks = async (req, res) => {
    let payload = req.body;

    // setup stripe
    const stripe = Stripe(process.env.STRIPE_SECRET);

    // verify event signature
    const signature = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        console.error('Webhook signature verification failed. ', error.message);
        return res.sendStatus(400);
    }

    // handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`Received payment of ${paymentIntent.amount}!`);
            // handle asynchronously
            handleReceivedPayment(paymentIntent);
            break;
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Checkout session was completed!`);
            // handle asynchronously
            handleCheckoutSessionCompleted(session);
            break;
        default:
            // Unexpected event type
            break;
    }

    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
}