import express from 'express';

// controllers
import {
    createCart,
    deleteAllCarts,
    deleteCart,
    getAllCarts,
    getCart,
    getLoggedUserCart,
    getUserCart,
    updateCart,
    updateLoggedCart
} from '../controllers/cart.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin, roleBusiness } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.get('/', getAllCarts);
router.get('/me', auth, getLoggedUserCart);
router.get('/user/:id', getUserCart);
router.get('/:id', getCart);

router.post('/', createCart);

router.patch('/me', auth, updateLoggedCart);
router.patch('/:id', updateCart);

router.delete('/', deleteAllCarts);
router.delete('/:id', deleteCart);


export default router;