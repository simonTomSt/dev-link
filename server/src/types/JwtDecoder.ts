import {UserDoc} from "../models/User";

export interface JwtDecoder {
    user: {
        id: string
    };
    iat: number,
    exp: number;
}