import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { HTTP_STATUS, STRING_CONSTANTS } from './constants.js'
import ResponseHandler from './responseModel.js'

const tokenName = process.env.TOKEN_NAME

export const generateToken = (userId) => {
    return jwt.sign({id : userId},process.env.JWT_SECRET,{
        expiresIn : '1d'
    })
}

export const sendToken = (res,token)=>{
    res.cookie(tokenName,token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
   })
}

export const verifyToken = async (req,res,next) => {
    
    try {
        const token = req.cookies[tokenName];
        if (!token) {
            return ResponseHandler.error(res, STRING_CONSTANTS.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED)
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if (!decoded) {
            return ResponseHandler.error(res, STRING_CONSTANTS.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
        }
        req.user = decoded;
        next()

    } catch (error) {
        console.log(STRING_CONSTANTS.TOKEN_VERIFY_ERROR,HTTP_STATUS.INTERNAL_SERVER_ERROR)
        if (error.name === "TokenExpiredError") {
            return ResponseHandler.error(res, STRING_CONSTANTS.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED)
        } else if (error.name === "JsonWebTokenError") {
            return ResponseHandler.error(res, STRING_CONSTANTS.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED)
        } else {
            return ResponseHandler.error(res, STRING_CONSTANTS.SERVER, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    }

}

export const clearToken = (res) => {
    res.cookie(tokenName, "", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict", 
        expires: new Date(0) 
    });
};