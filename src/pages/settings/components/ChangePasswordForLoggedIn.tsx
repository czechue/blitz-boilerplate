import { Button, Card, PasswordInput, Title, Text } from '@mantine/core'
import { Vertical } from 'mantine-layout-components'
import { useMutation } from '@blitzjs/rpc'
import { Form, useForm, zodResolver } from '@mantine/form'
import changePasswordForLoggedIn from '@/features/auth/mutations/changePasswordForLoggedIn'
import { ChangePasswordForLoggedInInput } from '@/features/auth/schemas'
import { ChangePasswordForLoggedInInputForm } from '@/features/auth/schemas'
import { notifications } from '@mantine/notifications'

export const ChangePasswordForLoggedIn = () => {
    const [$changePassword, { isSuccess, isLoading }] = useMutation(changePasswordForLoggedIn)

    const form = useForm<ChangePasswordForLoggedInInputForm>({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
        },
        validateInputOnBlur: true,
        validate: zodResolver(ChangePasswordForLoggedInInput),
    })

    return (
        <Card withBorder={true} w={'100%'} maw={300}>
            {isSuccess && <Text>Password changed successfully</Text>}
            {!isSuccess && (
                <Vertical fullW>
                    <Title order={4}>Change Password</Title>
                    <Vertical fullW>
                        <Form
                            style={{ width: '100%' }}
                            form={form}
                            onSubmit={async (values) => {
                                await $changePassword(values)
                                notifications.show({
                                    title: 'Password changed successfully',
                                    message: 'You can now login with your new password',
                                    color: 'green',
                                })
                            }}
                        >
                            <Vertical fullW>
                                <PasswordInput
                                    w={'100%'}
                                    withAsterisk
                                    label="Password"
                                    required
                                    {...form.getInputProps('currentPassword')}
                                />

                                <PasswordInput
                                    w={'100%'}
                                    withAsterisk
                                    label="New Password"
                                    required
                                    {...form.getInputProps('newPassword')}
                                />

                                <PasswordInput
                                    w={'100%'}
                                    withAsterisk
                                    label="New Password Confirmation"
                                    required
                                    {...form.getInputProps('newPasswordConfirmation')}
                                />

                                <Button
                                    loading={isLoading}
                                    disabled={!form.isValid}
                                    type="submit"
                                    variant="light"
                                    color="blue"
                                    fullWidth
                                >
                                    Change Passwords
                                </Button>
                            </Vertical>
                        </Form>
                    </Vertical>
                </Vertical>
            )}
        </Card>
    )
}
