import mongoose from "mongoose";
import Business from "../models/business.js";

// ----- handlers for business routes -----

// ----- GET

// get all businesses
export const getAllBusiness = async (req, res) => {
    try {
        const bus = await Business.find();

        // no error, send response
        res.status(200).json(bus);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get one business
export const getBusiness = async (req, res) => {
    const { id } = req.params;

    try {
        const bus = await Business.findById(id);

        // no error, send response
        res.status(200).json(bus);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// ----- POST

// create a new business
export const createBusiness = async (req, res) => {
    // get info from body
    const bus = req.body;
    const newBus = new Business(bus);

    try {
        await newBus.save();

        // created business, send it
        res.status(201).json(newBus);

    } catch (error) {
        // send error
        res.status(409).json({ message: error.message });
    }
};

// ----- PATCH

// update one business
export const updateBusiness = async (req, res) => {
    // get information from request
    const { id } = req.params;
    const { name, description, address, open, close, image } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No business with id: ${id}` });

    // update business
    const updatedInfo = { name, description, address, open, close, image, _id: id };
    const updatedBus = await Business.findByIdAndUpdate(id, updatedInfo, { new: true });

    // provide response
    if(updatedBus) return res.status(200).json(updatedBus);
    else return res.status(404).json({ message: `No business with id: ${id}` });
};

// ----- DELETE

// delete all businesses
export const deleteAllBusinesses = async (req, res) => {
    try {
        await Business.deleteMany();

        // no error, send response
        res.status(200).json({ message: 'All businesses deleted successfully.' });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
}

// delete one business
export const deleteBusiness = async (req, res) => {
    const { id } = req.params;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No business with id: ${id}` });

    // delete food item
    const deleted = await Business.findByIdAndDelete(id);

    // provide response
    if(deleted) return res.status(200).json({ message: 'Business deleted successfully.' });
    else return res.status(404).json({ message: `No business with id: ${id}` });  
}