import * as Yup from "yup";

export const postSchema = Yup.object({
  name: Yup.string().required(),
  text: Yup.string().required(),
});
export type PostSchema = Yup.InferType<typeof postSchema>;
