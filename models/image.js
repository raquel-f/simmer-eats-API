import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    name: { type: String, required: true },
    img: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    }
});

const Image = mongoose.model('Image', imageSchema);
export default Image;
