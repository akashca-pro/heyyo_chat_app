// profile routes
import express from "express";
import { verifyToken } from "../utils/jwt.js";
import { profileValidationRules, validateForm } from "../middleware/validation.js";
import { STRING_CONSTANTS } from "../utils/constants.js";
import { deleteAccount, loadProfile, updateProfile } from "../controllers/profile.js";

const router = express.Router();

// view profile

router.get('/',
    verifyToken,
    loadProfile
)

router.post('/update',
    verifyToken,
    profileValidationRules,
    validateForm(STRING_CONSTANTS.PROFILE_UPDATION_ERROR),
    updateProfile
)

router.delete('/delete',
    verifyToken,
    deleteAccount
)

export default router