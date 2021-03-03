import { JwtDecoder } from "../types/JwtDecoder";
import config from "config";
import express from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, config.get("jwtToken")) as JwtDecoder;
    req.body.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
