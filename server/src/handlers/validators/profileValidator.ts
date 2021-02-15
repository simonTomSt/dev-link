import {check} from "express-validator";

export const createProfileValidator = [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills are  required").not().isEmpty(),
];
