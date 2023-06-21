import express from 'express';

// controllers
import {
    deleteAllUsers,
    deleteLoggedUser,
    deleteUser,
    getAllUsers,
    getLoggedUser,
    getUser,
    signIn,
    signUp,
    updateLoggedUser,
    updateUser
} from '../controllers/user.js';

// middleware
import auth from '../middleware/auth.js';
import { roleAdmin } from '../middleware/role.js';

// setup router
const router = express.Router();

// routes
router.get('/me', auth, getLoggedUser);
router.get('/', [auth, roleAdmin], getAllUsers);
router.get('/:id', [auth, roleAdmin], getUser);

router.post('/signin', signIn);
router.post('/signup', signUp);

router.patch('/me', auth, updateLoggedUser);
router.patch('/:id', [auth, roleAdmin], updateUser);

router.delete('/me', auth, deleteLoggedUser);
router.delete('/', [auth, roleAdmin], deleteAllUsers);
router.delete('/:id', [auth, roleAdmin], deleteUser);

export default router;