import mongoose from "mongoose";
import ShoppingCart from "../models/cart.js";

// ----- GET

// get all shopping carts
export const getAllCarts = async (req, res) => {
    try {
        const carts = await ShoppingCart.find();

        // no error, send response
        res.status(200).json(carts);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get a shopping cart
export const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await ShoppingCart.findById(id);

        // no error, send response
        res.status(200).json(cart);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get user shopping cart
export const getUserCart = async (req, res) => {
    const { id } = req.params;
    try {
        const userCart = await ShoppingCart.findOne({ user: id });

        // no error, send response
        res.status(200).json(userCart);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get the logged user's cart
export const getLoggedUserCart = async (req, res) => {
    const id = req.userId;

    try {
        const userCart = await ShoppingCart.findOne({ user: id });

        // no error, send response
        res.status(200).json(userCart);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}


// ----- POST

// create a new shopping cart
export const createCart = async (req, res) => {
    // get information from body
    const cart = req.body;
    const newShoppingCart = new ShoppingCart(cart);

    try {
        await newShoppingCart.save();

        // created shopping cart, send it
        res.status(201).json(newShoppingCart);

    } catch (error) {
        // send error
        res.status(409).json({ message: error.message });
    }
};


// ----- PATCH

// update one shopping cart
export const updateCart = async (req, res) => {
    // get information from request
    const { id } = req.params;
    const { products } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No shopping cart with id: ${id}` });

    // update shopping cart
    const updatedInfo = { products, _id: id };
    const updatedCart = await ShoppingCart.findByIdAndUpdate(id, updatedInfo, { new: true });

    // provide response
    if (updatedCart) return res.status(200).json(updatedCart);
    else return res.status(404).json({ message: `No shopping cart with id: ${id}` });
};

// update logged user's shopping cart
export const updateLoggedCart = async (req, res) => {
    // get information from request
    const userId = req.userId;
    const { products } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: `No user with id: ${userId}` });

    // update shopping cart
    const updatedInfo = { products };
    const updatedCart = await ShoppingCart.findOneAndUpdate({ user: userId }, updatedInfo, { new: true });

    // provide response
    if (updatedCart) return res.status(200).json(updatedCart);
    else return res.status(404).json({ message: `No shopping cart found for user with id: ${userId}` });
};


// ----- DELETE

// delete all shopping carts
export const deleteAllCarts = async (req, res) => {
    try {
        await ShoppingCart.deleteMany();

        // no error, send response
        res.status(200).json({ message: 'All shopping carts deleted successfully.' });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
}

// delete one shopping cart
export const deleteCart = async (req, res) => {
    const { id } = req.params;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No shopping cart with id: ${id}` });

    // delete food item
    const deleted = await ShoppingCart.findByIdAndDelete(id);

    // provide response
    if (deleted) return res.status(200).json({ message: 'Shopping cart deleted successfully.' });
    else return res.status(404).json({ message: `No shopping cart with id: ${id}` });
}