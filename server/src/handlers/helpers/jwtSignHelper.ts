import { UserDoc } from "../../models/User";
import config from "config";
import express from "express";
import jwt from "jsonwebtoken";

export const jwtSignHelper = async (resp: express.Response, user: UserDoc) => {
  let respToken = "";
  try {
    await user?.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtToken"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) return console.log(err);

        console.log(token);
        if (token) {
          respToken = token;
        }
        return resp.json({ respToken: respToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
