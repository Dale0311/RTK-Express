import express from 'express';
const router = express.Router();
import {
  signInController,
  signUpController,
} from '../controllers/auth.controllers.js';
router.post('/signup', signUpController);
router.post('/signin', signInController);

export default router;
