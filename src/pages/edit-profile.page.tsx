import React from 'react'
import Layout from '@/core/layouts/Layout'
import { BlitzPage, Routes, useParam } from '@blitzjs/next'
import { Vertical } from 'mantine-layout-components'
import { EditProfileForm } from '@/features/users/forms/EditProfileForm'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@blitzjs/rpc'
import updateProfile from '@/features/users/mutations/updateProfile'
import { useForm, zodResolver } from '@mantine/form'
import { UpdateProfileForm, UpdateProfileInput } from '@/features/users/schema'
import getUserForEditingProfile from '@/features/users/queries/getUserForEditingProfile'

const ProfilPage = () => {
    const router = useRouter()

    const [data, { refetch }] = useQuery(getUserForEditingProfile, {})

    const [$updateProfile, { isLoading }] = useMutation(updateProfile)

    const form = useForm<UpdateProfileForm>({
        initialValues: {
            name: data?.name || '',
            username: data?.username || '',
            bio: data?.bio || '',
            avatarImageKey: data?.avatarImageKey || '',
            coverImageKey: data?.coverImageKey || '',
        },
        validate: zodResolver(UpdateProfileInput),
        validateInputOnBlur: true,
    })

    return (
        <EditProfileForm
            form={form}
            onSubmit={async (values) => {
                await $updateProfile({
                    name: values.name,
                    username: values.username,
                    bio: values.bio,
                    avatarImageKey: values.avatarImageKey,
                    coverImageKey: values.coverImageKey,
                })

                if (values.username) {
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
    )
}

export const EditProfilePage: BlitzPage = () => {
    return (
        <Layout>
            <Vertical fullW center>
                <ProfilPage />
            </Vertical>
        </Layout>
    )
}

export default EditProfilePage
