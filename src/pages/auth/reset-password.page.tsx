import Layout from 'src/core/layouts/Layout'

import resetPassword from '@/features/auth/mutations/resetPassword'
import { BlitzPage, Routes, useParam } from '@blitzjs/next'
import { useMutation } from '@blitzjs/rpc'
import Link from 'next/link'
import { useForm, zodResolver } from '@mantine/form'
import { Button, PasswordInput, Text, Title } from '@mantine/core'
import { ResetPasswordForm, ResetPasswordInput } from '@/features/auth/schemas'
import { Vertical } from 'mantine-layout-components'
import { useRouter } from 'next/router'

const ResetPasswordPage: BlitzPage = () => {
    const router = useRouter()
    const token = router.query.token?.toString()

    const [$resetPassword, { isSuccess, isLoading }] = useMutation(resetPassword)

    const form = useForm<ResetPasswordForm>({
        initialValues: {
            password: '',
            passwordConfirmation: '',
            token: token || '',
        },
        validateInputOnBlur: true,
        validate: zodResolver(ResetPasswordInput),
    })

    let onSubmit = async (values) => {
        await $resetPassword({ ...values, token })
    }

    if (!token) {
        return <Text>Invalid Token</Text>
    }

    return (
        <Layout title="Reset Your Password">
            <Title order={3}>Set a New Password</Title>

            {isSuccess ? (
                <Vertical>
                    <Title order={3}>Password Reset Successfully</Title>
                    <Text>
                        Go to the <Link href={Routes.Home()}>homepage</Link>
                    </Text>
                </Vertical>
            ) : (
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Vertical fullW>
                        <PasswordInput
                            w={'100%'}
                            withAsterisk
                            label="Password"
                            required
                            {...form.getInputProps('password')}
                        />

                        <PasswordInput
                            w={'100%'}
                            withAsterisk
                            label="Password Confirmation"
                            required
                            {...form.getInputProps('passwordConfirmation')}
                        />

                        <Button
                            loading={isLoading}
                            disabled={!form.isValid}
                            type="submit"
                            variant="light"
                            color="blue"
                            fullWidth
                        >
                            Sign Up
                        </Button>
                    </Vertical>
                </form>
            )}
        </Layout>
    )
}

ResetPasswordPage.redirectAuthenticatedTo = '/'

export default ResetPasswordPage
