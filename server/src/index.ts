const connectDB = require("../config/db.js");

import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.get("/", (req, res) => res.send("api working!"));
app.listen(PORT, () => console.log("Server working"));
