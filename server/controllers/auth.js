import OTP from "../models/otp.js";
import User from "../models/user.js";
import { HTTP_STATUS, STRING_CONSTANTS } from "../utils/constants.js";
import { clearToken, generateToken, sendToken } from "../utils/jwt.js";
import { sendOtp } from "../utils/otp.js";
import bcrypt from 'bcryptjs'
import ResponseHandler from "../utils/responseModel.js";

// register user

export const register = async (req,res) => {
    
    try {
        
        const { username, email, password, publicKey } = req.body;

        const alreadyExist = await User.findOne({ email })

        if(alreadyExist)
            return ResponseHandler.error(res,STRING_CONSTANTS.USER_ALREADY_EXIST,HTTP_STATUS.CONFLICT)

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            username,
            email,
            password : hashedPassword,
            publicKey
        })

        const user = await User.findOne({ email })
        .select('_id')

        const token = generateToken(user._id);

        sendToken(res,token);

        return ResponseHandler.success(res, STRING_CONSTANTS.REGISTRATION_SUCCESS,HTTP_STATUS.OK,{userId : user._id})

    } catch (error) {
        console.log(STRING_CONSTANTS.REGISTRATION_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

}

//Login with JWT

export const login = async (req,res) => {
   
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email})
    
        if(!user) 
            return ResponseHandler.error(res, STRING_CONSTANTS.USER_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
    
        if(!(await bcrypt.compare(password,user.password)))
            return ResponseHandler.error(res, STRING_CONSTANTS.INVALID_PASSWORD, HTTP_STATUS.BAD_REQUEST);
        
        if(!user.isActive)
            return ResponseHandler.error(res,STRING_CONSTANTS.ACCOUNT_IS_DEACTIVATED,HTTP_STATUS.FORBIDDEN)
        
        await User.findByIdAndUpdate(user._id,{ $set : { isOnline : true } })

        const token = generateToken(user._id);

        sendToken(res,token);

        return ResponseHandler.success(res, STRING_CONSTANTS.LOGIN_SUCCESS, HTTP_STATUS.OK,{userId : user._id})

    } catch (error) {
        console.log(STRING_CONSTANTS.LOGIN_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.LOGIN_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

}

//send otp for password reset

export const forgotPassword = async (req,res) => {
    
    try {
        const {email} = req.body;
        const user = await User.findOne({email})

        if(!user)
            return ResponseHandler.error(res, STRING_CONSTANTS.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND)

        if(!user.isActive)
            return ResponseHandler.error(res,STRING_CONSTANTS.ACCOUNT_IS_DEACTIVATED,HTTP_STATUS.FORBIDDEN)

        await sendOtp(email, 'resetPassword', user.username);

        return ResponseHandler.success(res, STRING_CONSTANTS.RESET_OTP, HTTP_STATUS.OK)
        
    } catch (error) {
        console.log(STRING_CONSTANTS.OTP_SENT_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HTTP_STATUS.INTERNAL_SERVER_ERROR) 
    }

}

// verify the otp and create new password

export const verifyOtpForPassword = async (req,res) => {
    
    try {
        const {email, password ,otp} = req.body;

        const user = await User.findOne({email});

        if(!user) 
            return ResponseHandler.error(res,STRING_CONSTANTS.OTP_ERROR ,HTTP_STATUS.BAD_REQUEST);

        if(!user.isActive)
            return ResponseHandler.error(res,STRING_CONSTANTS.ACCOUNT_IS_DEACTIVATED,HTTP_STATUS.FORBIDDEN)

        const otpRecord = await OTP.findOne({ email , otp , otpType : "resetPassword" })
        
        if(!otpRecord) return ResponseHandler.error(res, STRING_CONSTANTS.OTP_ERROR, HTTP_STATUS.BAD_REQUEST)
        
        await OTP.findByIdAndDelete(otpRecord._id)

        const hashedPassword = await bcrypt.hash(password,10);

        user.password = hashedPassword

        await user.save()

        return ResponseHandler.success(res, STRING_CONSTANTS.PASSWORD_RESET_SUCCESS, HTTP_STATUS.OK)

    } catch (error) {
        console.log(STRING_CONSTANTS.PASSWORD_RESET_ERROR, error);
        return  ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

}

// clear Token 

export const logout = async (req,res) => {

    try {

        const userId = req.user.id;

        await User.findByIdAndUpdate(userId,{ $set : { isOnline : false } })

        clearToken(res)
 
        return ResponseHandler.success(res, STRING_CONSTANTS.LOGOUT_SUCCESS, HTTP_STATUS.OK)

    } catch (error) {
        console.log(STRING_CONSTANTS.LOGOUT_ERROR, error);
        return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
    
}

