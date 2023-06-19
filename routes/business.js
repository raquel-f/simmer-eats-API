import express from 'express';

// controllers
import {
    createBusiness,
    deleteAllBusinesses,
    deleteBusiness,
    getAllBusiness,
    getBusiness,
    updateBusiness
} from '../controllers/business.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin, roleBusiness } from '../middleware/role.js';

// setup router
const router = express.Router();

// routes
router.get('/', [auth, roleAdmin], getAllBusiness);
router.get('/:id', [auth, roleBusiness], getBusiness);

router.post('/', [auth, roleBusiness], createBusiness);

router.patch('/:id', [auth, roleBusiness], updateBusiness);

router.delete('/', [auth, roleAdmin], deleteAllBusinesses);
router.delete('/:id', [auth, roleBusiness], deleteBusiness);


export default router;