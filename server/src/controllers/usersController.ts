import {User, UserDoc} from '../models/User';

import bcrypt from "bcrypt";
import {checkIfAlreadyExists} from '../handlers/errorsHandlers/usersErrorHandler';
import express from 'express';
import gravatar from "gravatar";
import {validationResult} from 'express-validator';
import {jwtSignHelper} from "../handlers/helpers/jwtSignHelper";

export const createUser = async (
    req: express.Request<UserDoc>,
    resp: express.Response
) => {


    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    checkIfAlreadyExists(resp, user);

    const avatar = gravatar.url(email, {s: "200", r: "pg", d: "mm"});

    user = new User({
        name,
        email,
        avatar,
        password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await jwtSignHelper(resp, user);

};
