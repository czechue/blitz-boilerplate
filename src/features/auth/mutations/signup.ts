import { SecurePassword } from '@blitzjs/auth/secure-password'
import { resolver } from '@blitzjs/rpc'

import { Role } from '~/types'
import { SignupInput } from '../schemas'
import db from '~/db'
import { sendEmail } from '~/email/sendEmail'
import EmailTemplateWelcome from '~/email/react-email/emails/email-template-welcome'
import React from 'react'

export default resolver.pipe(resolver.zod(SignupInput), async ({ name, email, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())

    const existingUser = await db.user.findFirst({
        where: { email: email.toLowerCase().trim() },
    })

    if (existingUser) throw new Error('Something went wrong')

    const user = await db.user.create({
        data: {
            name,
            email: email.toLowerCase().trim(),
            hashedPassword,
            role: 'USER',
        },
        select: { id: true, name: true, email: true, role: true },
    })

    if (user) {
        const react = React.createElement(EmailTemplateWelcome, {
            props: {
                name: user.name || '',
            },
        })

        await sendEmail({
            to: user.email,
            subject: 'Welcome to Example App',
            react,
        })
    }

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
})
