import { useToggle } from '@mantine/hooks'

import { PaperProps } from '@mantine/core'

import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export function MainAuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register'])

    return <>{type === 'login' ? <LoginForm toggle={toggle} /> : <SignupForm toggle={toggle} />}</>
}
