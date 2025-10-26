import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .regex(emailRegex, { message: 'Please enter a valid email address' }),
  password: z
    .string({ message: 'Password is required' })
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
  keepLoggedIn: z.boolean().default(false).optional(),
});

export const signupSchema = z
  .object({
    fullName: z
      .string({ message: 'Full name is required' })
      .min(1, { message: 'Full name is required' })
      .min(2, { message: 'Full name must be at least 2 characters' }),
    email: z
      .string({ message: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .regex(emailRegex, { message: 'Please enter a valid email address' }),
    password: z
      .string({ message: 'Password is required' })
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    confirmPassword: z
      .string({ message: 'Please confirm your password' })
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
