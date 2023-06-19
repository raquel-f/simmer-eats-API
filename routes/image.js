import express from 'express';
import multer from 'multer';

// controllers
import { deleteAllImages, deleteImage, downloadImage, uploadImage } from '../controllers/image.js';

// middleware
import { roleAdmin, roleBusiness } from '../middleware/role.js';
import auth from '../middleware/auth.js';

// setup router
const router = express.Router();

// create storage engine (uses /uploads for temp file storage)
const storage = multer.diskStorage({
    destination: function (_req, _file, callback) { callback(null, './uploads'); },
    filename: function (_req, file, callback) { callback(null, file.originalname); }
});
const upload = multer({ storage });

// routes
router.get('/:id', downloadImage);

router.post('/', [upload.single('file'), auth, roleBusiness], uploadImage);

router.delete('/:id', [auth, roleBusiness], deleteImage);
router.delete('/', [auth, roleAdmin], deleteAllImages);

export default router;