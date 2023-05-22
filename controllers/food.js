import mongoose from "mongoose";
import FoodItem from "../models/foodItem.js";
import { SERVINGS } from "../constants/index.js";

const PRICING_MULTIPLIER = 0.85;

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

// get all food items from one restaurant
export const getRestaurantFood = async (req, res) => {
    // restaurant id
    const { id } = req.params;

    try {
        const foodItems = await FoodItem.find({ owner: id });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all vegetarian food
export const getVegetarianFood = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ notes: 'Vegetarian' });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all lactose free food
export const getLactoseFreeFood = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ notes: 'Lactose Free' });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all food that has a single serving portion 
export const getSingleFood = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ serving: SERVINGS.Single });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all food that has a family serving portion 
export const getFamilyFood = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ serving: SERVINGS.Family });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all food that has a party serving portion 
export const getPartyFood = async (req, res) => {
    try {
        const foodItems = await FoodItem.find({ serving: SERVINGS.Party });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all food with budget pricing
export const getBudgetFood = async (req, res) => {
    try {
        // calculate average price of food (minumum -> single serving portion)
        const averagePrice = await FoodItem.aggregate([
            { $match: { "serving.0": SERVINGS.Single  } },
            {
                $group: {
                    _id: null,
                    minPriceAvg: { $avg: { $first: "$price" } }
                }
            }
        ]);

        // calculate budget pricing threshold
        const budgetPrice = averagePrice[0].minPriceAvg * PRICING_MULTIPLIER;

        // find food with pricing less than or equal to the threshold
        const foodItems = await FoodItem.find({ "price.0": { $lte: budgetPrice } });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all food with premium pricing
export const getPremiumFood = async (req, res) => {
    try {
        // calculate average price of food (maximum -> party serving portion)
        const averagePrice = await FoodItem.aggregate([
            { $match: { serving: SERVINGS.Party  } },
            {
                $group: {
                    _id: null,
                    maxPriceAvg: { $avg: { $last: "$price" } }
                }
            }
        ]);

        // calculate premium pricing threshold
        const premiumPrice = averagePrice[0].maxPriceAvg * PRICING_MULTIPLIER;

        // find food with pricing greater than or equal to the threshold
        const foodItems = await FoodItem.find({ "price.0": { $gte: premiumPrice } });

        // no error, send response
        res.status(200).json(foodItems);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

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
    if (updatedItem) return res.status(200).json(updatedItem);
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
    if (deleted) return res.status(200).json({ message: 'Food deleted successfully.' });
    else return res.status(404).json({ message: `No food with id: ${id}` });
}