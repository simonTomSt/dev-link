import {
    ExtractDoc,
    Type,
    createSchema,
    typedModel,
} from "ts-mongoose";

export const UserSchema = createSchema({
    name: Type.string({required: true}),
    email: Type.string({required: true, unique: true}),
    password: Type.string({required: true}),
    avatar: Type.string(),
    date: Type.date({default: Date.now}),
});

export const User = typedModel("User", UserSchema);
export type UserDoc = ExtractDoc<typeof UserSchema>;

