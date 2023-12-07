import express from "express";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { body } from "express-validator";

const authRouter = express.Router();

const usernameValidation = () => body('username').trim().notEmpty().withMessage("Username is empty");
const passwordValidation = () => body('password').trim().notEmpty().isLength({ min: 6 }).withMessage("Password must be at least 6 characters");


authRouter.post('/sign-in',
  usernameValidation(),
  passwordValidation(),
  SignIn
);

authRouter.post('/sign-up',
  usernameValidation(),
  passwordValidation(),
  SignUp
);

export { authRouter };
