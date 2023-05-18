import mongoose from 'mongoose';

const businessSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    open: {
        hour: { type: String, required: true },
        minute: { type: String, required: true },
    },
    close: {
        hour: { type: String, required: true },
        minute: { type: String, required: true },
    },
    image: { type: mongoose.Types.ObjectId, ref: 'Image', required: true },
    approved: { type: Boolean, default: false, required: true },
});

const Business = mongoose.model('Business', businessSchema);
export default Business;