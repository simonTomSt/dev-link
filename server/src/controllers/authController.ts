import express from "express";
import {User} from "../models/User";
import {checkIfPasswordsMatch, checkIfUserExists} from "../handlers/errorsHandlers/authErrorHandler";
import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import {jwtSignHelper} from "../handlers/helpers/jwtSignHelper";

export const getUserByToken = async (req: express.Request, res: express.Response) => {
        try {
            const user = await User.findById(req.body.user.id).select('-password');
            res.json(user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
;

export const authLogin = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    !errors.isEmpty() && res.status(400).json({errors: errors.array()});
    const {email, password} = req.body;

    let user = await User.findOne({email});
    checkIfUserExists(res, user);

    const isMatch = user && await bcrypt.compare(password, user.password);
    checkIfPasswordsMatch(res, isMatch);

    user && await jwtSignHelper(res, user);

};