import {check} from "express-validator";

export const createPostValidator = [
    check("text", "Text is required").not().isEmpty(),
];