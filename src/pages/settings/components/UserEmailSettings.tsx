import React from 'react'
import { Vertical } from 'mantine-layout-components'
import { Card, Checkbox, Text, Title } from '@mantine/core'
import { useMutation, useQuery } from '@blitzjs/rpc'
import getUserEmailSettings from '@/features/users/queries/getUserEmailSettings'
import setUserSetting from '@/features/users/mutations/setUserSetting'
import { ToggleUserSetting } from '@/core/components/ToggleUserSetting'

export const UserEmailSettings = () => {
    const [settings] = useQuery(getUserEmailSettings, {})

    return (
        <Card withBorder={true} w={'100%'} maw={300}>
            <Vertical fullW>
                <Title order={4}>Change Password</Title>
                <ToggleUserSetting
                    settings={settings}
                    settingKey={'settingsEmailMarketing'}
                    label="Set Email Marketing"
                />
                <ToggleUserSetting
                    settings={settings}
                    settingKey={'settingsEmailProduct'}
                    label="Set Email Product"
                />
            </Vertical>
        </Card>
    )
}
