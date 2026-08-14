import { ReactNode } from "react";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./zodSchema";
import z from "zod";

// Page Layout Props type
export type PageLayoutProps = Readonly<{
  children: ReactNode;
}>;

// Login form data type
export type LoginType = z.infer<typeof loginSchema>;

// Register form data type
export type RegisterType = z.infer<typeof registerSchema>;

// ForgotPassword form data type
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

// ResetPassword form data type
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
