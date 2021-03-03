import * as Yup from "yup";

export const profileSchema = Yup.object({
  company: Yup.string(),
  website: Yup.string(),
  location: Yup.string(),
  status: Yup.string().required(),
  skills: Yup.string().required(),
  bio: Yup.string(),
  githubUserName: Yup.string(),
  twitter: Yup.string(),
  facebook: Yup.string(),
});
export type ProfileModel = Yup.InferType<typeof profileSchema>;

export const educationSchema = Yup.object({
  _id: Yup.string().optional(),
  school: Yup.string().required(),
  degree: Yup.string().required(),
  fieldOfStudy: Yup.string().required(),
  from: Yup.date().required(),
  to: Yup.date(),
  current: Yup.boolean(),
});
export type EducSchemaModel = Yup.InferType<typeof educationSchema>;

export type EducationModel = EducSchemaModel & { _id: string };
