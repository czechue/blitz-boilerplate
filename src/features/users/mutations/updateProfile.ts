import { resolver } from '@blitzjs/rpc'

import db from '~/db'
import { UpdateProfileInput } from '@/features/users/schema'

export default resolver.pipe(
    resolver.zod(UpdateProfileInput),
    resolver.authorize(),
    async (input, { session: { userId } }) => {
        const updatedUser = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                name: input.name,
                username: input.username,
                bio: input.bio,
                avatarImageKey: input.avatarImageKey,
                coverImageKey: input.coverImageKey,
            },
        })
        return updatedUser
    }
)
