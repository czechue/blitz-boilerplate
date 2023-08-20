import { useForm, zodResolver } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core'
import { GoogleButton, TwitterButton } from './SocialButtons'

import { useMutation } from '@blitzjs/rpc'
import signup from '@/features/auth/mutations/signup'
import { Vertical } from 'mantine-layout-components'

import { SignupFormType, SignupInput } from '@/features/auth/schemas'

import Link from 'next/link'
import { Routes } from '@blitzjs/next'
import { ReactFC } from '~/types'

export const SignupForm: ReactFC<{ toggle: () => void }> = ({ toggle }) => {
    const [$signup, { isLoading: isSignupLoading }] = useMutation(signup)

    const loading = isSignupLoading

    const form = useForm<SignupFormType>({
        initialValues: {
            email: '',
            password: '',
            name: '',
            terms: false,
        },
        validate: zodResolver(SignupInput),
        validateInputOnBlur: true,
        validateInputOnChange: ['terms'],
    })

    return (
        <Vertical mih="100vh" center fullW fullH>
            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" weight={500}>
                    Welcome to Example App, register with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton radius="xl">Google</GoogleButton>
                    <TwitterButton radius="xl">Twitter</TwitterButton>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form
                    onSubmit={form.onSubmit(async (values) => {
                        await $signup(values)
                    })}
                >
                    <Stack>
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            {...form.getInputProps('name')}
                            radius="md"
                        />

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
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

                        <Checkbox
                            {...form.getInputProps('terms')}
                            label="I accept terms and conditions"
                        />
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            onClick={toggle}
                            component="button"
                            type="button"
                            color="dimmed"
                            size="xs"
                        >
                            Already have an account? Login
                        </Anchor>
                        <Button
                            disabled={!form.isValid}
                            loading={loading}
                            type="submit"
                            radius="xl"
                        >
                            Signup
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Vertical>
    )
}
