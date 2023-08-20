import { resolver } from '@blitzjs/rpc'
import React from 'react'
import { z } from 'zod'
import db from '~/db'
import { regenerateToken } from '@/utils/tokens'
import { TokenType } from '@prisma/client'
import { URL_ORIGIN } from '@/config'
import { sendEmail } from '~/email/sendEmail'
import { EmailTemplateConfirmEmail } from '~/email/react-email/emails/email-template-confirm-email'
import EmailTemplateWelcome from '~/email/react-email/emails/email-template-welcome'

export const getEmailVerifyLink = async ({ userId, userEmail }): Promise<string> => {
    const token = await regenerateToken({
        userId,
        userEmail,
        tokenType: TokenType.VERIFY_EMAIL,
    })
    const link = `${URL_ORIGIN}/auth/verify-email?token=${token}`
    return link
}

export const sendVerificationEmail = async ({ userId, userEmail, userName }): Promise<void> => {
    const confirmEmailLink = await getEmailVerifyLink({
        userId,
        userEmail,
    })
    await sendEmail({
        to: userEmail,
        subject: 'Verify your email address',
        react: React.createElement(EmailTemplateConfirmEmail, {
            props: { confirmEmailLink, name: userName },
        }),
    })
}

const Input = z.object({})

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
    const user = await db.user.findFirst({
        where: { id: userId },
    })

    if (!user) throw new Error('User not found')

    const confirmEmailLink = await getEmailVerifyLink({
        userId,
        userEmail: user.email,
    })

    const react = React.createElement(EmailTemplateConfirmEmail, {
        props: { confirmEmailLink: confirmEmailLink, name: user.name || '' },
    })

    await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        react,
    })

    return true
})
