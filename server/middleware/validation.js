import { body, validationResult } from 'express-validator'
import ResponseHandler from '../utils/responseModel.js'
import { HTTP_STATUS, STRING_CONSTANTS } from '../utils/constants.js'

export const registerValidationRules = [
    body('email').isEmail().withMessage('Invalid email format'),

    body('password').isLength({ min : 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)
    .withMessage('Password must include at least one uppercase, one lowercase, one number, and one special character'),

    body('username').isLength({ min : 3 })
    .matches(/^[A-Za-z][A-Za-z0-9\s]*$/)
    .withMessage('Username should not start with a number or contain special characters'),

    body('keyBundle').notEmpty().withMessage('Public key is required')
]

export const loginValidationRules = [
    body('email').isEmail().withMessage('Invalid email format'),

    body('password').isLength({ min : 6 }).notEmpty()
    .withMessage('Password is required'),

]


export const profileValidationRules = [
  body('username')
    .isLength({ min: 3 })
    .matches(/^[A-Za-z][A-Za-z0-9\s]*$/)
    .withMessage('Username should not start with a number or contain special characters'),

  body('profileImage')
    .optional()
    .isString()
    .withMessage('Profile image must be a string (URL or file path)'),

  body('age')
    .isInt({ min: 0 })
    .withMessage('Age must be a valid non-negative number'),

  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be one of: male, female, or other'),

  body('status')
    .optional()
    .isString()
]

export const validateForm = (errorMessage) => async(req,res,next) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return ResponseHandler.error(res,
            errorMessage,
            HTTP_STATUS.BAD_REQUEST,
            errors.array())
    }
    next()
}