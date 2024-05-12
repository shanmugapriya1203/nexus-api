import express from 'express';
import { isAdmin } from '../utils/authMiddleware.js';
import { createShelter } from '../controllers/shelterController.js';

const router = express.Router();


router.post('/create',isAdmin,createShelter)





export default router










