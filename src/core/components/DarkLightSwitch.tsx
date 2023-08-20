import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'

export const DarkLightSwitch = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const isDark = colorScheme === 'dark'

    return (
        <ActionIcon
            variant="outline"
            color={isDark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
        >
            {isDark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
    )
}
