import { resolver } from '@blitzjs/rpc'
import db from '../../../../db'
import { regenerateToken } from '@/utils/tokens'
import { TokenType } from '@prisma/client'
import { URL_ORIGIN } from '@/config'
import { sendEmail } from '~/email/sendEmail'
import EmailTemplateResetPassword from '~/email/react-email/emails/email-template-reset-password'
import { ForgotPasswordInput } from '@/features/auth/schemas'
import React from 'react'

export default resolver.pipe(resolver.zod(ForgotPasswordInput), async ({ email }) => {
    const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })

    if (!user) {
        await new Promise((resolve) => setTimeout(resolve, 750))
        return true
    }

    const token = await regenerateToken({
        tokenType: TokenType.RESET_PASSWORD,
        userId: user.id,
        userEmail: user.email,
    })

    let resetPasswordUrl = `${URL_ORIGIN}/auth/reset-password?token=${token}`

    await sendEmail({
        to: user.email,
        subject: 'Reset your password for Example App',
        react: React.createElement(EmailTemplateResetPassword, { props: { resetPasswordUrl } }),
    })

    return true
})
