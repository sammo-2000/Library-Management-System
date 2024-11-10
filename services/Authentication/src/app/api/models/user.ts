// src/models/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  user_role: z.string().min(1, { message: "User role is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  createdAt: z.date().optional()
});

export type User = z.infer<typeof UserSchema>;

  