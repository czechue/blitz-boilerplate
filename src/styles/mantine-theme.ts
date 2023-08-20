import { ButtonProps, MantineThemeOverride } from '@mantine/core'

const buttonDefaultProps: Partial<ButtonProps> = {
    variant: 'light',
    size: 'md',
}

// https://mantine.dev/theming/theme-object/
export const mantineTheme: MantineThemeOverride = {
    cursorType: 'pointer',
    primaryColor: 'violet',
    components: {
        Button: {
            defaultProps: buttonDefaultProps,
        },
    },
}
