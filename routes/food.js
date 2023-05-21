import express from 'express';

// controllers
import { getAllFood, createFoodItem, deleteAllFood, deleteFoodItem, getFoodItem, updateFoodItem, getRestaurantFood } from '../controllers/food.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin, roleBusiness } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.get('/', getAllFood);
router.get('/:id', getFoodItem);
router.get('/restaurant/:id', getRestaurantFood);

router.post('/', createFoodItem);

router.patch('/:id', [auth, roleBusiness], updateFoodItem);

router.delete('/', deleteAllFood);
router.delete('/:id', deleteFoodItem);


export default router;