import express from 'express';

// controllers
import {
    addProductLoggedCart,
    createCart,
    deleteAllCarts,
    deleteCart,
    getAllCarts,
    getCart,
    getLoggedUserCart,
    getUserCart,
    removeProductLoggedCart,
    updateCart,
    updateLoggedCart
} from '../controllers/cart.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin } from '../middleware/role.js';

// setup router
const router = express.Router();

// routes
router.get('/', [auth, roleAdmin], getAllCarts);
router.get('/me', auth, getLoggedUserCart);
router.get('/user/:id', [auth, roleAdmin], getUserCart);
router.get('/:id', [auth, roleAdmin], getCart);

router.post('/', [auth, roleAdmin], createCart);

router.patch('/me', auth, updateLoggedCart);
router.patch('/me/add', auth, addProductLoggedCart);
router.patch('/me/remove', auth, removeProductLoggedCart);
router.patch('/:id', [auth, roleAdmin], updateCart);

router.delete('/', [auth, roleAdmin], deleteAllCarts);
router.delete('/:id', [auth, roleAdmin], deleteCart);


export default router;