import {
  createPost,
  deletePostsById,
  getAllPosts,
  getPostById,
  getUserPosts,
} from "../../controllers/postsController";

import { authMiddleware } from "../../middleware/authMiddleware";
import { createPostValidator } from "../../handlers/validators/postsValidator";
import express from "express";

export const router = express.Router();

router.get("/", authMiddleware, getAllPosts);
router.get("single/:id", authMiddleware, getPostById);
router.get("/user", authMiddleware, getUserPosts);

router.delete("/:id", authMiddleware, deletePostsById);

router.post("/:id", authMiddleware, createPostValidator, createPost);
export const postsRoutes = router;
