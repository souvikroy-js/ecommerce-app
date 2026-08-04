import { ReactNode } from "react";
import { loginSchema, registerSchema } from "./zodSchema";
import z from "zod";

// Page Layout Props type
export type PageLayoutProps = Readonly<{
  children: ReactNode;
}>;

// Login form data type
export type LoginType = z.infer<typeof loginSchema>;

// Register form data type
export type RegisterType = z.infer<typeof registerSchema>;
