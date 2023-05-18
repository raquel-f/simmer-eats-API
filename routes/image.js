import express from 'express';
import multer from 'multer';
import { deleteAllImages, deleteImage, downloadImage, uploadImage } from '../controllers/image.js';

// setup router
const router = express.Router();

// create storage engine (uses /uploads for temp file storage)
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage });

// TODO: FIX MIDDLEWARE

// routes
router.get('/:id', downloadImage);

router.post('/', upload.single('file'), uploadImage);

router.delete('/:id', deleteImage);
router.delete('/', deleteAllImages);

export default router;