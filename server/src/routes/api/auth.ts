import express from "express";
import {authMiddleware} from "../../middleware/authMiddleware";
import {authLoginValidator} from "../../handlers/validators/authValidators";
import {authLogin, getUserByToken} from "../../controllers/authController";

const router = express.Router();

router.get("/", authMiddleware, getUserByToken);


router.post("/login", authLoginValidator, authLogin)


export const authRoutes = router;
