import express from 'express';

// controllers
import {
    getAllFood,
    getFoodItem,
    getRestaurantFood,
    getVegetarianFood,
    getLactoseFreeFood,
    getSingleFood,
    getFamilyFood,
    getPartyFood,
    getBudgetFood,
    getPremiumFood,
    createFoodItem,
    updateFoodItem,
    deleteAllFood,
    deleteFoodItem,
} from '../controllers/food.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin, roleBusiness } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.get('/', getAllFood);
router.get('/vegetarian', getVegetarianFood);
router.get('/lactoseFree', getLactoseFreeFood);
router.get('/single', getSingleFood);
router.get('/family', getFamilyFood);
router.get('/party', getPartyFood);
router.get('/budget', getBudgetFood);
router.get('/premium', getPremiumFood);
router.get('/restaurant/:id', getRestaurantFood);
router.get('/:id', getFoodItem);

router.post('/', createFoodItem);

router.patch('/:id', /* [auth, roleBusiness], */ updateFoodItem);

router.delete('/', deleteAllFood);
router.delete('/:id', deleteFoodItem);


export default router;