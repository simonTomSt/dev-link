import {check} from "express-validator";

export const authLoginValidator = [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required").exists(),
];
