import {UserDoc} from "../../models/User";

import express from "express";

export const checkIfUserExists = (
    resp: express.Response,
    user: null | undefined | UserDoc
) => {
    try {
        if (!user) {
            return resp.status(400).json({errors: [{msg: "Invalid credentials"}]});
        }
    } catch (error) {
        return resp.status(500).send("Server error: " + error);
    }
};


export const checkIfPasswordsMatch = (resp: express.Response, isMatch: boolean | null) => {
    if (!isMatch) {
        return resp.status(400).json({errors: [{msg: "Invalid credentials"}]})
    }
}