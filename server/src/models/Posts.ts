import { ExtractDoc, Type, createSchema, typedModel } from "ts-mongoose";

const PostSchema = createSchema({
  user: Type.objectId({ required: true, ref: "User" }),
  text: Type.string({ required: true }),
  name: Type.string(),
  userName: Type.string(),
  avatar: Type.string(),
  likes: Type.array().of({
    user: Type.objectId({ ref: "User" }),
  }),
  comments: Type.array().of({
    user: Type.objectId({ ref: "User" }),
    name: Type.string(),
    text: Type.string({ required: true }),
    avatar: Type.string(),
    date: Type.date({ default: Date.now }),
  }),
  date: Type.date({ default: Date.now }),
});

export const Post = typedModel("Post", PostSchema);
export type PostDoc = ExtractDoc<typeof PostSchema>;
