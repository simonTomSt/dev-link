import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().required().trim(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export const loginSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export type RegisterModel = Yup.InferType<typeof registerSchema>;

export type LoginModel = Yup.InferType<typeof loginSchema>;
