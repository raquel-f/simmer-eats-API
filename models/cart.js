import mongoose from 'mongoose';
import { SERVINGS } from '../constants/index.js';

const cartItemSchema = mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true },
    serving: { type: String, enum: [SERVINGS.Single, SERVINGS.Family, SERVINGS.Party], required: true },
    totalPrice: { type: Number, required: true }
});

const cartSchema = mongoose.Schema({
    products: { type: [cartItemSchema] },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    lastUpdated: { type: Date, default: Date.now() }
});

const ShoppingCart = mongoose.model('ShoppingCart', cartSchema);
export default ShoppingCart;