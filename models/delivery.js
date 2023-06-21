import mongoose from 'mongoose';
import { DELIVERY_STATUS } from '../constants/index.js';
import { ItemSchema } from './cart.js';

const deliverySchema = mongoose.Schema({
    products: { type: [ItemSchema] },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    payment: {type: String, required: true},
    lastUpdated: { type: Date, default: Date.now() },
    status: {
        type: String,
        default: DELIVERY_STATUS.Pending,
        enum: [
            DELIVERY_STATUS.Pending,
            DELIVERY_STATUS.Confirmed,
            DELIVERY_STATUS.Canceled,
            DELIVERY_STATUS.Shipped,
            DELIVERY_STATUS.Transit,
            DELIVERY_STATUS.Complete
        ],
        required: true
    }
});

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;