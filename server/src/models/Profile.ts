import {createSchema, ExtractDoc, Type, typedModel} from "ts-mongoose";
import {UserSchema} from "./User";

export const ProfileSchema = createSchema(
    {
        user: Type.objectId({required: true, ref: "User"}),
        company: Type.string(),
        website: Type.string(),
        location: Type.string(),
        status: Type.string({required: true}),
        skills: Type.array({required: true}).of(Type.string()),
        bio: Type.string(),
        githubUserName: Type.string(),
        education: Type.array(
        ).of({
            school: Type.string({required: true}),
            degree: Type.string({required: true}),
            fieldOfStudy: Type.string({required: true}),
            from: Type.date({required: true}),
            to: Type.date(),
            current: Type.boolean(),
        }),
        experience: Type.array(
        ).of({
            title: Type.string({required: true}),
            company: Type.string({required: true}),
            location: Type.string({required: true}),
            from: Type.date({required: true}),
            to: Type.date(),
            current: Type.boolean(),
            description: Type.string()
        }),
        social: Type.object().of({
            facebook: Type.string(),
            youtube: Type.string(),
            twitter: Type.string(),
            linkedin: Type.string(),
            instagram: Type.string(),
        })
    }
)

export const Profile = typedModel("Profile", ProfileSchema);
export type ProfileDoc = ExtractDoc<typeof ProfileSchema>;
