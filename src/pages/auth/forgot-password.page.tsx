import Layout from 'src/core/layouts/Layout'
import forgotPassword from '@/features/auth/mutations/forgotPassword'
import { useMutation } from '@blitzjs/rpc'
import { BlitzPage } from '@blitzjs/next'
import { Button, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { Vertical } from 'mantine-layout-components'
import { ForgotPasswordForm, ForgotPasswordInput } from '@/features/auth/schemas'
import { notifications } from '@mantine/notifications'

const ForgotPasswordPage: BlitzPage = () => {
    const [$forgotPassword, { isSuccess, isLoading }] = useMutation(forgotPassword)

    const form = useForm<ForgotPasswordForm>({
        initialValues: {
            email: '',
        },
        validate: zodResolver(ForgotPasswordInput),
    })

    return (
        <Layout title="Forgot Your Password?">
            <Vertical>
                <Title order={3}>Forgot your password?</Title>

                {isSuccess ? (
                    <Vertical>
                        <Title order={3}>Request Submitted</Title>
                        <p>
                            If your email is in our system, you will receive instructions to reset
                            your password shortly.
                        </p>
                    </Vertical>
                ) : (
                    <form
                        onSubmit={form.onSubmit(async (values) => {
                            await $forgotPassword(values)
                            notifications.show({
                                title: 'Password reset email sent',
                                message: 'Check your inbox for further instructions',
                                color: 'blue',
                            })
                        })}
                    >
                        <Vertical>
                            <TextInput
                                withAsterisk
                                label="Email"
                                placeholder="Enter your email"
                                required
                                {...form.getInputProps('email')}
                            />

                            <Button
                                disabled={!form.isValid}
                                loading={isLoading}
                                type="submit"
                                variant="light"
                                color="blue"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Vertical>
                    </form>
                )}
            </Vertical>
        </Layout>
    )
}

export default ForgotPasswordPage
