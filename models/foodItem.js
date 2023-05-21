import mongoose from 'mongoose';
import { SERVINGS } from '../constants/index.js';

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    price: { type: [Number], required: true },
    skill: { type: Number, default: 1 },
    serving: { type: [String], default: [SERVINGS.Single], enum: [SERVINGS.Single, SERVINGS.Family, SERVINGS.Party] },
    notes: { type: [String], required: false },
    pack: { type: String, default: 'The Sims 4' },
    image: { type: mongoose.Types.ObjectId, ref: 'Image', required: true },
    owner: { type: mongoose.Types.ObjectId, ref: 'Business', required: true } 
});

const FoodItem = mongoose.model('Food', foodSchema);
export default FoodItem;