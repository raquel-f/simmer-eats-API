import express from 'express';

// controllers
import { createCheckout } from '../controllers/stripe.js';

// middleware
import auth from '../middleware/auth.js';

// setup router
const router = express.Router();

// routes
router.post('/createCheckout', auth, createCheckout);


export default router;