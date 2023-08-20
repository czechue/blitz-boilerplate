import React from 'react'
import Layout from '@/core/layouts/Layout'
import { BlitzPage, Routes, useParam } from '@blitzjs/next'
import { Vertical } from 'mantine-layout-components'
import { Alert, Button, Group, Modal, Text, Textarea, TextInput } from '@mantine/core'
import { useMutation, useQuery } from '@blitzjs/rpc'
import getUserForProfile from '@/features/users/queries/getUserForProfile'
import { useCurrentUser } from '@/features/users/hooks/useCurrentUser'
import { useDisclosure } from '@mantine/hooks'
import { useForm, zodResolver } from '@mantine/form'
import updateProfile from '@/features/users/mutations/updateProfile'
import { UpdateProfileForm, UpdateProfileInput } from '@/features/users/schema'
import { notifications, showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { EditProfileForm } from '@/features/users/forms/EditProfileForm'
import { IconAlertCircle } from '@tabler/icons-react'
import requestVerificationEmail from '@/features/auth/mutations/requestVerificationEmail'
import { UploadButton } from '@/core/components/UploadThing'

export const ProfilePage: BlitzPage = () => {
    const [opened, { open, close }] = useDisclosure(false)

    const username = useParam('username', 'string')

    const router = useRouter()

    const [user] = useQuery(
        getUserForProfile,
        { username: username || '' },
        { enabled: !!username }
    )

    const [$requestVerificationEmail, { isLoading: isSendingEmail, isSuccess }] =
        useMutation(requestVerificationEmail)

    const [$updateProfile, { isLoading }] = useMutation(updateProfile)

    const currentUser = useCurrentUser()

    const isOwner = currentUser?.id === user?.id

    const form = useForm<UpdateProfileForm>({
        initialValues: {
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
            avatarImageKey: user?.avatarImageKey || '',
            coverImageKey: user?.coverImageKey || '',
        },
        validate: zodResolver(UpdateProfileInput),
        validateInputOnBlur: true,
    })

    if (!user) {
        return (
            <Layout>
                <Vertical>
                    <Text>User not found</Text>
                </Vertical>
            </Layout>
        )
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => {
                    close()
                    form.reset()
                }}
                title="Profil Edit"
            >
                <EditProfileForm
                    form={form}
                    onSubmit={async (values) => {
                        console.log('values', values)
                        await $updateProfile({
                            name: values.name,
                            username: values.username,
                            bio: values.bio,
                            avatarImageKey: values.avatarImageKey,
                            coverImageKey: values.coverImageKey,
                        })

                        if (values.username && values.username !== user.username) {
                            await router.push(Routes.ProfilePage({ username: values.username }))
                        }

                        showNotification({
                            color: 'green',
                            title: 'Success',
                            message: 'Profile updated',
                        })
                        close()
                    }}
                    isSubmitting={isLoading}
                />
            </Modal>

            <Layout>
                <Vertical>
                    {isOwner && !currentUser?.emailVerifiedAt && (
                        <Alert
                            variant="outline"
                            icon={<IconAlertCircle size="1rem" />}
                            title={isSuccess ? 'Success' : 'Warning!'}
                            color={isSuccess ? 'green' : 'red'}
                        >
                            <Vertical>
                                {!isSuccess && (
                                    <>
                                        <Text>
                                            Please verify your email to be able to use all features
                                            of Example App.
                                        </Text>
                                        <Button
                                            loading={isSendingEmail}
                                            variant="outline"
                                            onClick={async () => {
                                                await $requestVerificationEmail()
                                                notifications.show({
                                                    title: 'Verification email sent',
                                                    color: 'green',
                                                    message:
                                                        'Please check your email for verification link.',
                                                })
                                            }}
                                        >
                                            Resend verification e-mail
                                        </Button>
                                    </>
                                )}
                                {isSuccess && (
                                    <>
                                        <Text>
                                            <strong>Verification email sent.</strong>
                                        </Text>
                                        <Text>
                                            Please check your email for the verification link.
                                        </Text>
                                    </>
                                )}
                            </Vertical>
                        </Alert>
                    )}
                    {isOwner && (
                        <Group position="center">
                            <Button onClick={open}>Edit Profile</Button>
                        </Group>
                    )}
                    <Text>Hello from User: {user.name}</Text>
                    <Text>{user.bio}</Text>
                    <Text>{user.avatarImageKey}</Text>
                </Vertical>
            </Layout>
        </>
    )
}

export default ProfilePage
