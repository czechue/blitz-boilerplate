import { List, RingProgress, Tooltip, Text } from '@mantine/core'
import { useCurrentUser } from '@/features/users/hooks/useCurrentUser'
import Link from 'next/link'
import { Routes } from '@blitzjs/next'
import { Vertical } from 'mantine-layout-components'

export const UserProfileProgress = () => {
    const user = useCurrentUser()

    if (!user) return null

    const keys = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'username',
            label: 'Username',
        },
        {
            key: 'bio',
            label: 'Bio',
        },
        {
            key: 'avatarImageKey',
            label: 'Profile picture',
        },
        {
            key: 'coverImageKey',
            label: 'Cover picture',
        },
    ]

    const existingKeys = keys.filter(({ key }) => user[key])

    const missingKeys = keys.filter(({ key }) => !user[key])

    const completionPercentage = Math.round((existingKeys.length / keys.length) * 100)

    if (completionPercentage === 100) return null

    return (
        <Link href={Routes.EditProfilePage()}>
            <Tooltip
                label={
                    <Vertical spacing="xs">
                        <Text fw="bold">Profile Progress ({completionPercentage}%)</Text>
                        <Vertical spacing={0}>
                            <Text>Missing:</Text>
                            <List>
                                {missingKeys.map(({ label }) => (
                                    <List.Item c={'gray.1'} key={label}>
                                        <Text>{label}</Text>
                                    </List.Item>
                                ))}
                            </List>
                        </Vertical>
                    </Vertical>
                }
            >
                <RingProgress
                    size={25}
                    thickness={4}
                    roundCaps
                    sections={[{ value: completionPercentage, color: 'cyan' }]}
                />
            </Tooltip>
        </Link>
    )
}
