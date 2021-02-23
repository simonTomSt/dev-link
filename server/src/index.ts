import { authRoutes } from "./routes/api/auth";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { postsRoutes } from "./routes/api/posts";
import { profileRoutes } from "./routes/api/profile";
import { usersRoutes } from "./routes/api/users";

const connectDB = require("../config/db.js");
const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
  })
);

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => res.send("api working!"));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => console.log("Server working"));
