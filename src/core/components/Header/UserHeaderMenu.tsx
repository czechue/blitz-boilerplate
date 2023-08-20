import { Text, Menu, Indicator, Tooltip, useMantineTheme, Box, Button } from '@mantine/core'
import {
    IconArrowsLeftRight,
    IconLogout,
    IconPencil,
    IconSearch,
    IconSettings,
    IconTrash,
    IconUser,
    IconUserShield,
} from '@tabler/icons-react'
import Conditional from 'conditional-wrap'
import { UserAvatar } from '@/core/components/UserAvatar/UserAvatar'
import React from 'react'
import { useCurrentUser } from '@/features/users/hooks/useCurrentUser'
import { MenuItemIcon, MenuItemLink } from '@/core/components/MenuItems'
import { Routes } from '@blitzjs/next'
import logout from '@/features/auth/mutations/logout'
import { useMutation } from '@blitzjs/rpc'
import { useRouter } from 'next/router'

export const UserHeaderMenu = () => {
    const router = useRouter()
    const theme = useMantineTheme()
    const user = useCurrentUser()
    const [$logout] = useMutation(logout)

    if (!user) {
        return null
    }

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Box sx={{ cursor: 'pointer' }}>
                    <Conditional
                        condition={user?.role === 'ADMIN'}
                        wrap={(children) => {
                            return (
                                <Indicator
                                    color={'none'}
                                    position={'bottom-end'}
                                    label={
                                        <Tooltip label="Admin">
                                            <IconUserShield
                                                size={13}
                                                color={
                                                    theme.colorScheme === 'light'
                                                        ? theme.colors.dark[8]
                                                        : theme.colors.gray[0]
                                                }
                                            />
                                        </Tooltip>
                                    }
                                >
                                    {children}
                                </Indicator>
                            )
                        }}
                    >
                        <UserAvatar user={user} radius="xl" />
                    </Conditional>
                </Box>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Accounts</Menu.Label>
                <MenuItemLink Icon={IconSettings} href={Routes.SettingsPage()}>
                    Settings
                </MenuItemLink>
                <MenuItemLink Icon={IconPencil} href={Routes.EditProfilePage()}>
                    Edit profile
                </MenuItemLink>
                {user.username && (
                    <MenuItemLink
                        Icon={IconUser}
                        href={Routes.ProfilePage({
                            username: user.username,
                        })}
                    >
                        Go to profile
                    </MenuItemLink>
                )}
                <Menu.Divider />

                <Menu.Label>Authentication</Menu.Label>

                <MenuItemIcon
                    c={theme.colors.red[3]}
                    Icon={IconLogout}
                    onClick={async () => {
                        await $logout()
                        await router.push(Routes.Home())
                    }}
                >
                    Logout
                </MenuItemIcon>
            </Menu.Dropdown>
        </Menu>
    )
}
