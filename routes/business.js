import express from 'express';

// controllers
import { createBusiness, deleteAllBusinesses, deleteBusiness, getAllBusiness, getBusiness, updateBusiness } from '../controllers/business.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin, roleBusiness } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.get('/', getAllBusiness);
router.get('/:id', getBusiness);

router.post('/', createBusiness);

router.patch('/:id', updateBusiness);

router.delete('/', deleteAllBusinesses);
router.delete('/:id', deleteBusiness);


export default router;