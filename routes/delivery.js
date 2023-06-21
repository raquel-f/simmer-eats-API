import express from 'express';

// controllers
import {
    createDelivery,
    deleteAllDeliveries,
    deleteDelivery,
    getAllDeliveries,
    getDelivery,
    getLoggedUserDeliveries,
    getUserDeliveries,
    updateDelivery
} from '../controllers/delivery.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.get('/', [auth, roleAdmin], getAllDeliveries);
router.get('/me', auth, getLoggedUserDeliveries);
router.get('/user/:id', [auth, roleAdmin], getUserDeliveries);
router.get('/:id', auth, getDelivery);

router.post('/', [auth, roleAdmin], createDelivery);

router.patch('/:id', /* [auth, roleAdmin], */ updateDelivery);

router.delete('/', [auth, roleAdmin], deleteAllDeliveries);
router.delete('/:id', [auth, roleAdmin], deleteDelivery);


export default router;