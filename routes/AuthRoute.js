import express from 'express';
import login from '../controllers/LoginController.js';
import signup from '../controllers/SignupController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/login', login);

export default authRouter;
