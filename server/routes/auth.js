// Auth routes
import express from "express";
import { forgotPassword, login, logout, register, verifyOtpForPassword }
 from "../controllers/auth.js";

import { loginValidationRules, registerValidationRules, validateForm } from "../middleware/validation.js";
import { verifyToken } from "../utils/jwt.js";
import { STRING_CONSTANTS } from "../utils/constants.js";

const router = express.Router();

// verify and register otp

router.post('/register',
    registerValidationRules, 
    validateForm(STRING_CONSTANTS.REGISTRATION_ERROR), 
    register)

// login user

router.post('/login', 
    loginValidationRules,
    validateForm(STRING_CONSTANTS.LOGIN_ERROR),
    login)

// forgotpassword , send otp

router.patch('/forgot-password/send-otp',
    forgotPassword)

// verify otp and update password

router.patch('/forgot-password/verify-otp',
    verifyOtpForPassword)

// logout user

router.delete('/logout',
    verifyToken,
    logout)

export default router