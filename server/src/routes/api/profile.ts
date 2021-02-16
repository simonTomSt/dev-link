import express from "express";

import {authMiddleware} from "../../middleware/authMiddleware";
import {
    addUserEducation,
    addUserExperience,
    createUserProfile, deleteUserEducation, deleteUserExperience,
    deleteUserProfile,
    getAllProfiles, getUserGithub,
    getUserProfile
} from "../../controllers/profileController";
import {
    addEducationValidation,
    addExperienceValidation,
    createProfileValidator
} from "../../handlers/validators/profileValidator";

const router = express.Router();


router.get("/", getAllProfiles);
router.get("/:id", getUserProfile);
router.get("/github/:name", getUserGithub);

router.delete("/delete/:id", authMiddleware, deleteUserProfile);
router.delete("/experience/delete/:id", authMiddleware, deleteUserExperience);
router.delete("/education/delete/:id", authMiddleware, deleteUserEducation);


// @ts-ignore
router.put("/education/:id", [authMiddleware, addEducationValidation], addUserEducation);// @ts-ignore
// @ts-ignore
router.put("/experience/:id", [authMiddleware, addExperienceValidation], addUserExperience);
// @ts-ignore
router.post("/create/:id", [authMiddleware, createProfileValidator], createUserProfile);


export const profileRoutes = router;
