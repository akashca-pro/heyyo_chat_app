// Auth routes
import express from "express";
import { forgotPassword, login, logout, register, verifyOtpForPassword }
 from "../controllers/auth.js";
const router = express.Router();

// verify and register otp

router.post('/register',register)

// login user

router.post('/login',login)

// forgotpassword , send otp

router.patch('/forgot-password/send-otp',forgotPassword)

// verify otp and update password

router.patch('/forgot-password/verify-otp',verifyOtpForPassword)

// logout user

router.delete('/logout',logout)

export default router