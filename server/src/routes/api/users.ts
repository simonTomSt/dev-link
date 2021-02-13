import { addUserValidator } from "../../handlers/validators/usersValidators";
import { createUser } from "../../controllers/usersController";
import express from "express";

const router = express.Router();

router.post("/", addUserValidator, createUser);

export const usersRoutes = router;
