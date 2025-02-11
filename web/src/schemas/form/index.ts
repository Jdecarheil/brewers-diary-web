import { z } from 'zod';

const feedback = {
  passwordMin: 'Password must be more than 8 characters',
  passwordMax: 'Password cannot be longer than 15 characters',
};

export const passwordSchema = {
  password: z
    .string()
    .min(8, {
      message: feedback.passwordMin,
    })
    .max(15, {
      message: feedback.passwordMax,
    }),
};

export const emailSchema = {
  email: z.string().email(),
};

export const resetSchema = z.object({
  ...emailSchema,
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(4, {
        message: 'Usernames are not less than 4 characters',
      })
      .max(15, {
        message: 'Usernames are not more than 15 characters',
      })
      .optional(),
    ...passwordSchema,
    confirmPassword: z
      .string()
      .min(8, {
        message: feedback.passwordMin,
      })
      .max(15, {
        message: feedback.passwordMax,
      }),
    ...emailSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'The passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  ...passwordSchema,
  ...emailSchema,
});
