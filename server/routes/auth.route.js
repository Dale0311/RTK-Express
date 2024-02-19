import express from 'express';
const router = express.Router();
import {
  signInController,
  signUpController,
  refresh,
  logout,
} from '../controllers/auth.controllers.js';
router.post('/signup', signUpController);
router.post('/signin', signInController);
router.get('/refresh', refresh);
router.get('/logout', logout);

export default router;
