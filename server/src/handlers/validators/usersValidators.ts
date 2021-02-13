import { check } from "express-validator";

export const addUserValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Invalid email").isEmail(),
  check("password", "Password must have 6 or more characters").isLength({
    min: 6,
  }),
];
