import { Vertical } from 'mantine-layout-components'
import { Button, Group, Textarea, TextInput } from '@mantine/core'
import { Form, UseFormReturnType } from '@mantine/form'
import React from 'react'
import { UpdateProfileForm } from '@/features/users/schema'
import { ReactFC } from '~/types'
import { UploadThingFileInput } from '@/core/components/UploadThingFileInput'

export const EditProfileForm: ReactFC<{
    form: UseFormReturnType<UpdateProfileForm>
    onSubmit: (values: UpdateProfileForm) => Promise<void>
    isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
    return (
        <Form form={form} onSubmit={onSubmit}>
            <Vertical fullW>
                <TextInput
                    w={'100%'}
                    required
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps('name')}
                    radius="md"
                />

                <TextInput
                    w={'100%'}
                    label="Username"
                    placeholder="Username"
                    {...form.getInputProps('username')}
                    radius="md"
                />

                <Textarea
                    w={'100%'}
                    label="Bio"
                    placeholder="Bio"
                    {...form.getInputProps('bio')}
                    radius="md"
                />

                <UploadThingFileInput label="Profile Picture" name="avatarImageKey" form={form} />
                <UploadThingFileInput label="Cover Picture" name="coverImageKey" form={form} />

                <Group position="right" w={'100%'}>
                    <Button
                        disabled={!form.isValid}
                        loading={isSubmitting}
                        type="submit"
                        variant="light"
                    >
                        Save
                    </Button>
                </Group>
            </Vertical>
        </Form>
    )
}
