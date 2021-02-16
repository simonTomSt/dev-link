import { Post } from "../models/Posts";
import { User } from "../models/User";
import express from "express";
import { validationResult } from "express-validator";

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  const errors = validationResult(req);
  !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ msg: "There is no user with such id" });
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.params.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const getUserPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await Post.find({ user: req.body.user.id });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const getAllPosts = async (res: express.Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const getPostById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) return res.status(404).json({ msg: "Post not found" });
    res.json(posts);
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server error");
  }
};

export const deletePostsById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.user.toString() != req.body.user.id)
      return res.status(404).json({ msg: "User not authorized" });

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server error");
  }
};

export const likePost = async (req: express.Request, res: express.Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "There is no such a post" });
    if (
      post.likes &&
      post.likes.filter((like) => like.user?.toString() == req.body.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes?.unshift({ user: req.body.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

export const unlikePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "There is no such a post" });
    if (
      post.likes &&
      post.likes.filter((like) => like.user?.toString() == req.body.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    const removeIndex = post.likes
      ?.map((like) => like.user?.toString())
      .indexOf(req.body.user.id) as number;
    post.likes?.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
