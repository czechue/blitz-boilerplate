import React from 'react'
import Layout from '@/core/layouts/Layout'
import { BlitzPage } from '@blitzjs/next'
import { Horizontal, Vertical } from 'mantine-layout-components'
import { Tabs } from '@mantine/core'
import { IconMail, IconSettings, IconUserCog } from '@tabler/icons-react'
import { ChangePasswordForLoggedIn } from '@/pages/settings/components/ChangePasswordForLoggedIn'
import { UserEmailSettings } from '@/pages/settings/components/UserEmailSettings'

export const SettingsPage: BlitzPage = () => {
    return (
        <Layout>
            <Vertical fullW center>
                <Tabs w={'100%'} orientation="vertical" defaultValue="account">
                    <Tabs.List>
                        <Tabs.Tab value="account" icon={<IconUserCog size="0.8rem" />}>
                            Account
                        </Tabs.Tab>
                        <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
                            Email
                        </Tabs.Tab>
                        <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
                            Settings
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="account" pl="md">
                        <ChangePasswordForLoggedIn />
                    </Tabs.Panel>

                    <Tabs.Panel value="email" pl="md">
                        <UserEmailSettings />
                    </Tabs.Panel>

                    <Tabs.Panel value="settings" pl="md">
                        Settings tab content
                    </Tabs.Panel>
                </Tabs>
            </Vertical>
        </Layout>
    )
}

export default SettingsPage
