import {UserDoc} from "../../models/User";

import express from "express";

export const checkIfUserExists = (
    resp: express.Response,
    user: null | undefined | UserDoc
) => {
    if (!user) {
        return resp.status(400).json({errors: [{msg: "Invalid credentials"}]});
    }
};


export const checkIfPasswordsMatch = (resp: express.Response, isMatch: boolean | null) => {
    if (!isMatch) {
        return resp.status(400).json({errors: [{msg: "Invalid credentials"}]})
    }
}