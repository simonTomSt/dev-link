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
  getUserGithub,
  getUserProfile,
} from "../../controllers/profileController";

import { authMiddleware } from "../../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/github/:name", getUserGithub);
router.get("/user", authMiddleware, getUserProfile);

router.delete("/delete", authMiddleware, deleteUserProfile);
router.delete("/experience/:id", authMiddleware, deleteUserExperience);
router.delete("/education/:id", authMiddleware, deleteUserEducation);

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
