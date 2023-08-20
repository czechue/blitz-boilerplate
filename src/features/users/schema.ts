import { z } from 'zod'
import { name } from '@/features/auth/schemas'

export const UpdateProfileInput = z.object({
    name,
    username: z.string().optional(),
    bio: z.string().optional(),
    avatarImageKey: z.string().optional(),
    coverImageKey: z.string().optional(),
})

export type UpdateProfileForm = z.infer<typeof UpdateProfileInput>

export const EmailInput = z.object({
    to: z.string(),
    subject: z.string(),
})

export type EmailForm = z.infer<typeof EmailInput> & {
    react: React.FunctionComponentElement<{ props: { name?: string } }>
}

export type EmailVerificationForm = z.infer<typeof EmailInput> & {
    react: React.FunctionComponentElement<{ props: { name?: string; confirmEmailLink: string } }>
}

export type EmailForgotPasswordForm = z.infer<typeof EmailInput> & {
    react: React.FunctionComponentElement<{ props: { resetPasswordUrl: string } }>
}
