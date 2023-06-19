import express from 'express';
import bodyParser from 'body-parser';

// controllers
import { handleWebhooks } from '../controllers/stripe.js';

// setup router
const router = express.Router();

// routes
router.post('/', bodyParser.raw({ type: '*/*' }), handleWebhooks);

export default router;