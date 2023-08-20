import { Menu, Text } from '@mantine/core'
import Link from 'next/link'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { ReactFC } from '~/types'
import Conditional from 'conditional-wrap'
import { Horizontal } from 'mantine-layout-components'
import { HelpTooltipCircle } from '@/core/HelpTooltipCircle'
import { confirmDeletion } from '@/modals'

let ITEM_FONT_SIZE = 14
let ICON_SIZE = 16

export const MenuItemLink = ({ Icon, href, ...rest }) => {
    return (
        <Menu.Item
            sx={{
                fontSize: ITEM_FONT_SIZE,
            }}
            component={Link}
            href={href}
            icon={<Icon size={ICON_SIZE} stroke={1.5} />}
            {...rest}
        />
    )
}

export const MenuItemEdit = ({ href, children = 'Edit' }) => {
    return (
        <MenuItemLink Icon={IconPencil} href={href}>
            {children}
        </MenuItemLink>
    )
}

export const MenuItemDelete: ReactFC<{
    onClick: any
    confirm?: boolean
    redirect?: any
}> = ({ onClick, redirect, confirm = true }) => {
    const { push } = useRouter()

    let del = async () => {
        await onClick()
        if (redirect) {
            push?.(redirect)
        }
    }

    return (
        <MenuItemIcon
            Icon={IconTrash}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                confirm ? confirmDeletion(del) : del()
            }}
            sx={(t) => ({
                color: t.colors.red[3],
                fontSize: ITEM_FONT_SIZE,
            })}
        >
            Delete
        </MenuItemIcon>
    )
}

export const MenuItemIcon = ({ Icon, children, tooltip = '', ...rest }) => {
    const childrenWithTooltip = (
        <Conditional
            condition={!!tooltip}
            wrap={(c) => (
                <Horizontal fullW>
                    <Text>{c}</Text>
                    <HelpTooltipCircle tooltip={tooltip} />
                </Horizontal>
            )}
        >
            {children}
        </Conditional>
    )

    return (
        <Menu.Item
            sx={{
                fontSize: ITEM_FONT_SIZE,
            }}
            icon={<Icon size={ICON_SIZE} stroke={1.5} />}
            {...rest}
        >
            {childrenWithTooltip}
        </Menu.Item>
    )
}
