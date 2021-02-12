import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.send("User Note"));

export const usersRoutes = router;
