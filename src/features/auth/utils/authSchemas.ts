import { z } from 'zod';

export const phoneSchema = z
  .string()
  .min(9, 'Enter a valid Ethiopian phone number')
  .regex(/^(\+251|0)?9\d{8}$/, 'Use a valid mobile number');

export const loginSchema = z.object({
  phoneNumber: phoneSchema,
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email').optional().or(z.literal(''))
});

export const otpSchema = z.object({
  code: z.string().length(6, 'Enter the 6 digit code')
});

export const forgotPasswordSchema = z.object({
  phoneNumber: phoneSchema
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
