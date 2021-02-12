import { User, UserDoc } from "../models/User";

import bcrypt from "bcrypt";
import { checkIfAlreadyExists } from "../handlers/errorsHandlers/usersErrorHandler";
import express from "express";
import gravatar from "gravatar";
import { validationResult } from "express-validator";

export const createUser = async (
  req: express.Request<UserDoc>,
  resp: express.Response
) => {
  const errors = validationResult(req);
  !errors.isEmpty() && resp.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  checkIfAlreadyExists(resp, user);

  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
  if (!user) {
    user = new User({
      name,
      email,
      avatar,
      password,
    });
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  try {
    await user?.save();
  } catch (err) {
    console.log(err);
  }

  return resp.send(`User Registered${user}`);
};
