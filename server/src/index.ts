import {authRoutes} from "./routes/api/auth";
import bodyParser from "body-parser";
import express from "express";
import {postsRoutes} from "./routes/api/posts";
import {profileRoutes} from "./routes/api/profile";
import {usersRoutes} from "./routes/api/users";

const connectDB = require("../config/db.js");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => res.send("api working!"));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => console.log("Server working"));
