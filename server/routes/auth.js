// Auth routes
import express from "express";
import { forgotPassword, login, logout, otp, verifyAndRegister, verifyOtpForPassword, verifyResetLink } from "../controllers/auth";
const router = express.Router();

// send otp to Email

router.patch('/register/send-otp',otp)

// verify and register otp

router.post('/register/verify-otp',verifyAndRegister)

// login user

router.post('/login',login)

// forgotpassword , send otp

router.patch('/forgot-password/send-otp',forgotPassword)

// verify otp and update password

router.patch('/forgot-password/verify-otp',verifyOtpForPassword)

// logout user

router.delete('/logout',logout)

export default router