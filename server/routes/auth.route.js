import express from 'express';
const router = express.Router();
import { signUpController } from '../controllers/auth.controllers.js';
router.post('/signup', signUpController);

export default router;
