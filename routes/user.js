import express from 'express';

// controllers
import { deleteAllUsers, deleteLoggedUser, deleteUser, getAllUsers, getLoggedUser, getUser, signIn, signUp, updateLoggedUser, updateUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';
import { roleAdmin } from '../middleware/role.js';

// setup router
const router = express.Router();

// TODO: FIX MIDDLEWARE

// routes
router.get('/me', auth, getLoggedUser);
router.get('/', [auth, roleAdmin], getAllUsers);
router.get('/:id', [auth, roleAdmin], getUser);

router.post('/signin', signIn);
router.post('/signup', signUp);

router.patch('/me', auth, updateLoggedUser);
router.patch('/:id', [auth, roleAdmin], updateUser);

router.delete('/me', auth, deleteLoggedUser);
router.delete('/', deleteAllUsers);
router.delete('/:id', deleteUser);

export default router;