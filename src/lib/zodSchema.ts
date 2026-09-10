import z from "zod";

// login form data schema
export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be minimum 8 characters long" }),
});

// Register form data schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: "Name must be minimum 2 characters long" }),
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string()
      .min(8, { error: "Password must be minimum 8 characters long" }),
    confirmPassword: z.string().min(1, { error: "Password didn't match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password didn't match",
    path: ["confirmPassword"],
  });

// forgotPassword form data schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// resetPassword form data schema
export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be at least 0"),
  stock: z.number().int().min(0, "Stock must be at least 0"),
  images: z.string().optional(),
  categoryId: z.string().optional(),
});
