import * as fs from 'fs';
import { promisify } from "util";
import mongoose from "mongoose";
import Image from "../models/image.js";

// encode file to base64 buffer
const encodeBase64 = (file) => {
    const base64 = file.toString('base64');
    const encoded = new Buffer.from(base64, 'base64');
    return encoded;
}


// ----- GET

// download base64 image
export const downloadImage = async (req, res) => {
    const { id } = req.params;

    try {
        // get image from db
        const imageData = await Image.findById(id);

        // construct response data
        const base64 = new Buffer.from(imageData.img.data, 'base64').toString('base64');
        const type = imageData.img.contentType;

        // no error, send response
        res.status(200).json({ image: `data:${type};base64,${base64}`, id: imageData._id });

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// ----- POST

// upload a new image
export const uploadImage = async (req, res) => {

    // prepare information from request
    const img = fs.readFileSync(req.file.path);

    // encode image
    const encodeImg = encodeBase64(img);
    const finalImg = { contentType: req.file.mimetype, data: encodeImg };
    const newImage = new Image({ name: req.file.originalname, img: finalImg });

    try {
        // save to db
        await newImage.save();

        // delete the temporary file from uploads
        const unlinkAsync = promisify(fs.unlink);
        await unlinkAsync(req.file.path);

        // created image, send it
        res.status(201).json(newImage);
    } catch (error) {
        // send error
        return res.status(500).json({ message: error.message });
    }
};


// ----- DELETE

// delete an image
export const deleteImage = async (req, res) => {
    const { id } = req.params;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No image with id: ${id}` });

    // delete image
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image deleted successfully.' });
}

// delete all images
export const deleteAllImages = async (req, res) => {
    try {
        await Image.deleteMany();

        // no error, send response
        res.status(200).json({ message: 'All images deleted successfully.' });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
}