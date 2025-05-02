import { HTTP_STATUS } from "./constants.js";

class ResponseHandler {
    static success(res,message='success', statusCode = HTTP_STATUS.OK, data=null){
        return res.status(statusCode).json({
            success : true,
            message,
            data
        })
    }

    static error(res, message='Something went wrong', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, error = null){
        return res.status(statusCode).json({
            success : false,
            message,
            error : error?.message  
        })
    }

}

export default ResponseHandler