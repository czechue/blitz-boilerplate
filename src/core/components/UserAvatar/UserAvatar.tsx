import { Avatar, AvatarProps } from '@mantine/core'
import { ReactFC } from '~/types'

type Props = {
    user: {
        name?: string | null
        avatarImageKey?: string | null
    }
} & Partial<AvatarProps>

export const getUploadthingUrl = (fileKey?: string | null) => {
    return fileKey ? `https://uploadthing.com/f/${fileKey}` : ''
}

export const getAvatarFallbackName = (name?: string | null) => {
    if (!name) return ''
    const [first, second] = name.split(' ')
    return `${first ? first.toUpperCase()[0] : ''}${second ? second.toUpperCase()[0] : ''}`
}

export const UserAvatar: ReactFC<Props> = ({ user, ...rest }) => {
    return (
        <Avatar src={getUploadthingUrl(user.avatarImageKey)} radius="xl" {...rest}>
            {getAvatarFallbackName(user.name)}
        </Avatar>
    )
}
