import * as z from "zod"

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})
