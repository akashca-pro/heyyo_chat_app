import { randomInt } from 'node:crypto';
import OTP from '../models/otp.js';
import nodemailer from 'nodemailer'

  
export const sendOtp = async (email, otpType, userName) => {
    
      try {
        
        const otp = randomInt(100000, 999999).toString();
  
        await OTP.create({
            email,
            otp,
            otpType,
            otpExpires : new Date(Date.now() + 2 * 60 * 1000)
        });
  
        await sendEmail(email, userName, otp)
  
        return true
  
      } catch (error) {
        console.log(error)
        throw new Error('Error sending otp')
      }
  
}

export const sendEmail = async(email,userName,otp)=>{
    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth :{
            user : process.env.SENDER_EMAIL,
            pass : process.env.SENDER_PASS
        },
    });

    try {
        await transport.sendMail({
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : `Heyyo Verification Message`,
            text : `
Dear ${userName},

Welcome to Heyyo chat app!

To ensure the security of your account, we require you to verify your account. Please use the One-Time Password (OTP) provided below to complete your email verification:

Your OTP Code: ${otp}

This code is valid for the next 2 minutes.
If you did not request this OTP, please ignore this email or contact our support team for assistance.
Thank you for choosing Heyyo. We're excited to have you on board chat and connect with people easily with end to end encryption.

Best regards,
The Heyyo Team
www.heyyo.chat
heyyochatapp@gmail.com
          `,
        });
        return true;
    } catch (error) {
        console.error('Error sending mail:', err);
        throw new Error('Error sending mail');
    }

};
