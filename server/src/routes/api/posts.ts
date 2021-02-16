import {
  commentPost,
  createPost,
  deleteComment,
  deletePostsById,
  getAllPosts,
  getPostById,
  getUserPosts,
  likePost,
  unlikePost,
} from "../../controllers/postsController";
import {
  commentValidator,
  createPostValidator,
} from "../../handlers/validators/postsValidator";

import { authMiddleware } from "../../middleware/authMiddleware";
import express from "express";

export const router = express.Router();

router.get("/", authMiddleware, getAllPosts);
router.get("single/:id", authMiddleware, getPostById);
router.get("/user", authMiddleware, getUserPosts);

router.delete("/:id", authMiddleware, deletePostsById);

router.post("/", authMiddleware, createPostValidator, createPost);
router.post("/comment/:id", authMiddleware, commentValidator, commentPost);
router.delete("/comment/:id/:comment_id", authMiddleware, deleteComment);

router.put("/like/:id", authMiddleware, likePost);
router.put("/unlike/:id", authMiddleware, unlikePost);

export const postsRoutes = router;
