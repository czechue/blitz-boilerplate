import { Checkbox } from '@mantine/core'
import React from 'react'
import { useMutation } from '@blitzjs/rpc'
import setUserSetting from '@/features/users/mutations/setUserSetting'

export const ToggleUserSetting = ({ settings, label, settingKey }) => {
    const [$setUserSetting, { isLoading }] = useMutation(setUserSetting)

    return (
        <Checkbox
            disabled={isLoading}
            onChange={async () => {
                await $setUserSetting({
                    key: settingKey,
                    value: !settings?.[settingKey],
                })
            }}
            checked={settings?.[settingKey]}
            label={label}
        />
    )
}
