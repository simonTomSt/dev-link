import {
  createPost,
  deletePostsById,
  getAllPosts,
  getPostById,
  getUserPosts,
  likePost,
  unlikePost,
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

router.put("/like/:id", authMiddleware, likePost);
router.put("/unlike/:id", authMiddleware, unlikePost);

export const postsRoutes = router;
