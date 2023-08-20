import { z } from 'zod'

export const email = z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim())

export const password = z
    .string()
    .min(6)
    .max(100)
    .transform((str) => str.trim())

export const name = z.string().min(3).max(40)

export const SignupInput = z.object({
    name,
    email,
    password,
    terms: z.boolean().refine((val) => val === true, { message: 'You must agree to the terms' }),
})

export type SignupFormType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
    email,
    password: z.string(),
})

export type LoginFormType = z.infer<typeof LoginInput>

export const ForgotPassword = z.object({
    email,
})

export const ResetPasswordInput = z
    .object({
        password: password,
        passwordConfirmation: password,
        token: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ['passwordConfirmation'], // set the path of the error
    })

export type ResetPasswordForm = z.infer<typeof ResetPasswordInput>

export const ChangePasswordInput = z.object({
    currentPassword: z.string(),
    newPassword: password,
})

export const ChangePasswordForLoggedInInput = z
    .object({
        currentPassword: z.string(),
        newPassword: password,
        newPasswordConfirmation: password,
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
        message: "Passwords don't match",
        path: ['newPasswordConfirmation'], // set the path of the error
    })

export type ChangePasswordForLoggedInInputForm = z.infer<typeof ChangePasswordForLoggedInInput>

export const ForgotPasswordInput = z.object({
    email,
})

export type ForgotPasswordForm = z.infer<typeof ForgotPasswordInput>
