import express from "express";

import {authMiddleware} from "../../middleware/authMiddleware";
import {
    createUserProfile,
    deleteUserProfile,
    getAllProfiles,
    getUserProfile
} from "../../controllers/profileController";
import {createProfileValidator} from "../../handlers/validators/profileValidator";

const router = express.Router();


router.get("/", getAllProfiles);
router.get("/:id", getUserProfile);

router.delete("/delete/:id", authMiddleware, deleteUserProfile);

// @ts-ignore
router.post("/create/:id", [authMiddleware, createProfileValidator], createUserProfile);


export const profileRoutes = router;
