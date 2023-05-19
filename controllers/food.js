import mongoose from "mongoose";
import FoodItem from "../models/foodItem.js";

// ----- handlers for food routes -----

// ----- GET

// get all food items
export const getAllFood = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// get one food item
export const getFoodItem = async (req, res) => {
    const { id } = req.params;

    try {
        const foodItem = await FoodItem.findById(id);

        // no error, send response
        res.status(200).json(foodItem);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
};

// ----- POST

// create a new food item
export const createFoodItem = async (req, res) => {
    // get food from body
    const food = req.body;
    const newFoodItem = new FoodItem(food);

    try {
        await newFoodItem.save();

        // created food item, send it
        res.status(201).json(newFoodItem);

    } catch (error) {
        // send error
        res.status(409).json({ message: error.message });
    }
};

// ----- PATCH

// update one food item
export const updateFoodItem = async (req, res) => {
    // get information from request
    const { id } = req.params;
    const { name, ingredients, price, skill, serving, notes, pack, image, owner } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No food with id: ${id}` });

    // update food item
    const updatedInfo = { name, ingredients, price, skill, serving, notes, pack, image, owner, _id: id };
    const updatedItem = await FoodItem.findByIdAndUpdate(id, updatedInfo, { new: true });
    
    // provide response
    if(updatedItem) return res.status(200).json(updatedItem);
    else return res.status(404).json({ message: `No food with id: ${id}` });
};

// ----- DELETE

// delete all food items
export const deleteAllFood = async (req, res) => {
    try {
        await FoodItem.deleteMany();

        // no error, send response
        res.status(200).json({ message: 'All food deleted successfully.' });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
}

// delete one food item
export const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No food with id: ${id}` });

    // delete food item
    const deleted = await FoodItem.findByIdAndDelete(id);
    
    // provide response
    if(deleted) return res.status(200).json({ message: 'Food deleted successfully.' });
    else return res.status(404).json({ message: `No food with id: ${id}` });  
}