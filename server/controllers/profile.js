import User from "../models/user.js";
import { HTTP_STATUS, STRING_CONSTANTS } from "../utils/constants.js"
import ResponseHandler from "../utils/responseModel.js";

// To load the profile details
export const loadProfile = async (req,res) =>{

    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId)
        .select('-password -keyBundle')

        if(!user) return ResponseHandler.error(res,
        STRING_CONSTANTS.PROFILE_LOAD_ERROR,
        HTTP_STATUS.NOT_FOUND
        );

        const response = {
            username : user.username,
            profileImage : user.profileImage,
            status : user.status
        }

        return ResponseHandler.success(res,
        STRING_CONSTANTS.PROFILE_LOAD_SUCCESS,
        response
        );

    } catch (error) {
        console.log(STRING_CONSTANTS.PROFILE_LOAD_ERROR,error);
        return ResponseHandler.error(res,
        STRING_CONSTANTS.SERVER,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
        );

    }

}

// To update the profile details
export const updateProfile = async (req,res) => {
    
    try {
        const userId = req.user.id;
        const { username, profileImage, status } = req.body

        const user = await User.findById(userId)

        if(!user) return ResponseHandler.error(res,
        STRING_CONSTANTS.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
        );

        await User.findByIdAndUpdate(userId,
            { $set : { username , profileImage, status } } 
        );

        return ResponseHandler.success(res,
            STRING_CONSTANTS.PROFILE_UPDATION_SUCCESS,
            HTTP_STATUS.OK 
        );

    } catch (error) {
        console.log(STRING_CONSTANTS.PROFILE_UPDATION_ERROR,error);
        ResponseHandler.error(res,
        STRING_CONSTANTS.SERVER,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }

}

// To delete account of the user
export const deleteAccount = async (req,res) => {

    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if(!user) return ResponseHandler.error(res,
            STRING_CONSTANTS.USER_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
        );

        await User.findByIdAndDelete(userId);

        return ResponseHandler.success(res,
            STRING_CONSTANTS.ACCOUNT_DELETION_SUCCESS,
            HTTP_STATUS.OK
        );

    } catch (error) {
        console.log(STRING_CONSTANTS.ACCOUNT_DELETION_FAILED,error);
        ResponseHandler.error(res,
        STRING_CONSTANTS.SERVER,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }

}