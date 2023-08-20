import { useForm, zodResolver } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Stack,
    Box,
    Anchor,
} from '@mantine/core'
import { GoogleButton, TwitterButton } from './SocialButtons'

import { useMutation } from '@blitzjs/rpc'
import login from '@/features/auth/mutations/login'
import { Vertical } from 'mantine-layout-components'

import { LoginFormType, LoginInput } from '@/features/auth/schemas'
import Link from 'next/link'
import { Routes } from '@blitzjs/next'
import { ReactFC } from '~/types'

export const LoginForm: ReactFC<{ toggle: () => void }> = ({ toggle }) => {
    const [$login, { isLoading: isLoginLoading }] = useMutation(login)

    const loading = isLoginLoading

    const form = useForm<LoginFormType>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(LoginInput),
        validateInputOnBlur: true,
    })

    return (
        <Vertical mih="100vh" center fullW fullH>
            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" weight={500}>
                    Welcome to Example App, log in with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl">Google</GoogleButton>
                    <TwitterButton radius="xl">Twitter</TwitterButton>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form
                    onSubmit={form.onSubmit(async (values) => {
                        await $login(values)
                    })}
                >
                    <Stack>
                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@gmail.com"
                            radius="md"
                            {...form.getInputProps('email')}
                        />

                        <Vertical fullW spacing={'3px'}>
                            <PasswordInput
                                w="100%"
                                required
                                label="Password"
                                placeholder="Your password"
                                {...form.getInputProps('password')}
                                radius="md"
                            />
                            <Text
                                component={Link}
                                size="xs"
                                color="dimmed"
                                sx={{
                                    alignSelf: 'flex-end',
                                }}
                                href={Routes.ForgotPasswordPage()}
                            >
                                Forgot password?
                            </Text>
                        </Vertical>
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            onClick={toggle}
                            component="button"
                            type="button"
                            color="dimmed"
                            size="xs"
                        >
                            Don't have an account? Register
                        </Anchor>
                        <Button
                            disabled={!form.isValid}
                            loading={loading}
                            type="submit"
                            radius="xl"
                        >
                            Login
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Vertical>
    )
}
