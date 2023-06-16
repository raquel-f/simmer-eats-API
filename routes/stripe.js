import express from 'express';

// controllers
import { createCheckout } from '../controllers/stripe.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin, roleBusiness } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.post('/createCheckout', createCheckout);


export default router;