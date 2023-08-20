import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components'
import * as React from 'react'
import { ReactFC } from '~/types'

const APP_NAME = 'Example App'

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

const defaultProps = {
    name: 'Test user',
}

export const EmailTemplateWelcome: ReactFC<{
    props: {
        name?: string
    }
}> = ({ props = defaultProps }) => (
    <Html>
        <Head />
        <Preview>Welcome to ${APP_NAME}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={box}>
                    <Img src={`${baseUrl}/logo.png`} width="49" height="21" alt="Stripe" />
                    <Hr style={hr} />
                    <Text style={paragraph}>
                        {props?.name
                            ? `Hi ${props?.name}, thanks for creating a ${APP_NAME} account!`
                            : `Welcome to ${APP_NAME}!`}
                    </Text>
                    <Button pX={10} pY={10} style={button} href="https://Example App.com">
                        Click here to get started
                    </Button>
                    <Hr style={hr} />

                    <Text style={paragraph}>— The {APP_NAME} team</Text>
                    <Hr style={hr} />
                    <Text style={footer}>{APP_NAME}</Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

export default EmailTemplateWelcome

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
}

const box = {
    padding: '0 48px',
}

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
}

const paragraph = {
    color: '#525f7f',

    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
}

const anchor = {
    color: '#556cd6',
}

const button = {
    backgroundColor: '#656ee8',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
}

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
}
