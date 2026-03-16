import * as z from "zod"

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(6),
})

export const forgotSchema = z.object({
  email: z.email(),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
export type ForgotSchema = z.infer<typeof forgotSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
