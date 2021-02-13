import {UserDoc} from "../../models/User";

import express from "express";

export const checkIfAlreadyExists = (
    resp: express.Response,
    user: null | undefined | UserDoc
) => {
    try {
        if (user) {
            resp.status(400).json({errors: [{msg: "User already exist"}]});
        }
    } catch (error) {
        resp.status(500).send("Server error: " + error);
    }
};
