import { Stripe } from "stripe";
import FoodItem from "../models/foodItem.js";

// get food product name by its ID
const getProductName = async (id) => {
    let foodItem = await FoodItem.findById(id);
    return foodItem.name;
}

// ----- handlers for stripe payment routes -----


// ----- POST

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
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/cart'
        });

        // send redirect for stripe payment
        res.status(200).json({ redirect: session.url });

    } catch (error) {
        // send error
        res.status(400).json({ message: error.message });
    }
};