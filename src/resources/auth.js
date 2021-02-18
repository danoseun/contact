import Auth from '../controllers/auth';
import { validateUserSignup, validateUserSignin } from '../validations/auth';
import express from 'express';

export const authRouter = express.Router();

authRouter.post('/auth/signup', validateUserSignup, Auth.signup);
authRouter.post('/auth/login', validateUserSignin, Auth.login);

/*** BONUS POINTS ***/
//authRouter.route('/auth/forgotPassword').post(Auth.forgotPassword);