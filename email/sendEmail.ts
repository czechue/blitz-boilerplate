import { Resend } from 'resend'
import { EmailForgotPasswordForm, EmailForm, EmailVerificationForm } from '@/features/users/schema'
import { isDev } from '@/config'
import { CreateEmailOptions } from 'resend/build/src/emails/interfaces'

import { nodemailerAppTransport } from '~/email/nodemailerLocalAppTransport'
import { render } from '@react-email/render'
import { env } from '@/env.mjs'

const resend = new Resend(env.RESEND_API_KEY)

export const sendEmail = async ({
    to,
    subject,
    react,
}: EmailForm | EmailVerificationForm | EmailForgotPasswordForm) => {
    let message: Omit<CreateEmailOptions, 'text'> = {
        from: 'onboarding@resend.dev',
        to,
        subject,
    }

    if (isDev) {
        // const react = React.createElement(ExampleWelcomeEmail, {
        //     content: 'hello world from example',
        //     buttonText: 'View your Page',
        // })
        const html = render(react)
        return nodemailerAppTransport.sendMail({ ...message, html })
    }

    await resend.emails.send({
        ...message,
        react,
    })
}
