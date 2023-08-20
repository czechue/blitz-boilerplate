import { Horizontal, Vertical } from 'mantine-layout-components'
import {
    ActionIcon,
    FileInput,
    Image,
    Indicator,
    Loader,
    Text,
    Tooltip,
    useMantineTheme,
} from '@mantine/core'
import { IconPhoto, IconX } from '@tabler/icons-react'
import { getUploadthingUrl } from '@/core/components/UserAvatar/UserAvatar'
import React from 'react'
import { uploadFiles, useUploadThing } from '@/core/components/UploadThing'
import { notifications } from '@mantine/notifications'
import { UseFormReturnType } from '@mantine/form'

export const UploadThingFileInput = ({
    form,
    name,
    label,
}: {
    form: UseFormReturnType<any>
    name: string
    label: string
}) => {
    const [loading, setLoading] = React.useState(false)
    const theme = useMantineTheme()

    const { startUpload } = useUploadThing('imageUploader', {
        onClientUploadComplete: (res) => {
            setLoading(false)

            const fileKey = res?.[0]?.fileKey
            if (!fileKey) return
            form.setFieldValue(name, fileKey)
        },
        onUploadError: (error) => {
            setLoading(false)
            notifications.show({
                title: 'Upload error',
                color: 'red',
                message: error.message,
                icon: <IconPhoto size={16} />,
            })
        },
    })

    const existingImageKey = form.values[name]

    return (
        <Vertical>
            <Horizontal center>
                <Text
                    size={'sm'}
                    weight={500}
                    color={
                        theme.colorScheme === 'light' ? theme.colors.gray[9] : theme.colors.dark[9]
                    }
                >
                    {label}
                </Text>
                {loading && <Loader size="xs" />}
            </Horizontal>
            {existingImageKey && (
                <Indicator
                    color={'none'}
                    label={
                        <Tooltip label="Clear Image">
                            <ActionIcon
                                onClick={() => {
                                    form.setFieldValue(name, '')
                                }}
                                variant="light"
                                size={13}
                            >
                                <IconX />
                            </ActionIcon>
                        </Tooltip>
                    }
                >
                    <Image
                        radius="100%"
                        width="50px"
                        height="50px"
                        src={getUploadthingUrl(existingImageKey)}
                    />
                </Indicator>
            )}

            {!existingImageKey && (
                <FileInput
                    disabled={loading}
                    onChange={(files) => {
                        setLoading(true)
                        if (!files) return
                        startUpload([files])
                    }}
                    clearable={true}
                    placeholder={label}
                    icon={<IconPhoto size={16} />}
                />
            )}
        </Vertical>
    )
}
