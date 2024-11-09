import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/UserController';

const router = express.Router();

router.post('/', createUser); // POST: Create a new user
router.get('/', getAllUsers); // GET: Get all users
router.get('/:userId', getUserById); // GET: Get user by ID
router.put('/:userId', updateUserById); // PUT: Update user by ID
router.delete('/:userId', deleteUserById); // DELETE: Delete user by ID

export default router;
