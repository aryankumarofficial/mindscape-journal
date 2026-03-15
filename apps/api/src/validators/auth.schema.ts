import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  name: z.string().min(3),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const resendVerificationSchema = z.object({
  email:z.email()
})

export const forgotSchema = resendVerificationSchema;


export const resetSchema = z.object({
  uid: z.uuid({ error: `Invalid UUID` }),
  token: z.string().min(1, { error: `token is required` }),
  password: z.string().min(8),
})
