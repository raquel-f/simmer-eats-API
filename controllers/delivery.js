import mongoose from "mongoose";
import Delivery from "../models/delivery.js";


// ----- GET

// get all deliveries
export const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();

        // no error, send response
        res.status(200).json(deliveries);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get a delivery
export const getDelivery = async (req, res) => {
    const { id } = req.params;
    try {
        const delivery = await Delivery.findById(id);

        // no error, send response
        res.status(200).json(delivery);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get user deliveries
export const getUserDeliveries = async (req, res) => {
    const { id } = req.params;
    try {
        const userDeliveries = await Delivery.find({ user: id });

        // no error, send response
        res.status(200).json(userDeliveries);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get the logged user's deliveries
export const getLoggedUserDeliveries = async (req, res) => {
    const id = req.userId;

    try {
        const userDeliveries = await Delivery.find({ user: id });

        // no error, send response
        res.status(200).json(userDeliveries);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// ----- POST

// create a new delivery
export const createDelivery = async (req, res) => {
    // get information from body
    const delivery = req.body;
    const newDelivery = new Delivery(delivery);

    try {
        await newDelivery.save();

        // created delivery, send it
        res.status(201).json(newDelivery);

    } catch (error) {
        // send error
        res.status(409).json({ message: error.message });
    }
};

// ----- PATCH

// update one delivery
export const updateDelivery = async (req, res) => {
    // get information from request
    const { id } = req.params;
    const { status } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No delivery with id: ${id}` });

    // update delivery
    const updatedInfo = { status, _id: id };
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, updatedInfo, { new: true });

    // provide response
    if (updatedDelivery) return res.status(200).json(updatedDelivery);
    else return res.status(404).json({ message: `No delivery with id: ${id}` });
};

// ----- DELETE

// delete all deliveries
export const deleteAllDeliveries = async (req, res) => {
    try {
        await Delivery.deleteMany();

        // no error, send response
        res.status(200).json({ message: 'All deliveries deleted successfully.' });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
}

// delete one delivery
export const deleteDelivery = async (req, res) => {
    const { id } = req.params;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No delivery with id: ${id}` });

    // delete delivery
    const deleted = await Delivery.findByIdAndDelete(id);

    // provide response
    if (deleted) return res.status(200).json({ message: 'Delivery deleted successfully.' });
    else return res.status(404).json({ message: `No delivery with id: ${id}` });
}