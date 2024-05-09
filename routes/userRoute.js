import express from 'express';
import { getUserById, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/authUtils.js';

const router = express.Router();

router.get('/get/:id', getUserById);
router.put('/update/:userId',verifyToken,updateUser)

export default router;
