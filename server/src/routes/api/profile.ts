import {
  addEducationValidation,
  addExperienceValidation,
  createProfileValidator,
} from "../../handlers/validators/profileValidator";
import {
  addUserEducation,
  addUserExperience,
  createUserProfile,
  deleteUserEducation,
  deleteUserExperience,
  deleteUserProfile,
  getAllProfiles,
  getUserProfile,
} from "../../controllers/profileController";

import { authMiddleware } from "../../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/user/:id", getUserProfile);

router.delete("/delete", authMiddleware, deleteUserProfile);
router.delete("/experience/", authMiddleware, deleteUserExperience);
router.delete("/education/", authMiddleware, deleteUserEducation);

router.put(
  "/education",
  authMiddleware,
  addEducationValidation,
  addUserEducation
);
router.put(
  "/experience",
  authMiddleware,
  addExperienceValidation,
  addUserExperience
);
// @ts-ignore
router.post(
  "/create",
  [authMiddleware, createProfileValidator],
  createUserProfile
);

export const profileRoutes = router;
