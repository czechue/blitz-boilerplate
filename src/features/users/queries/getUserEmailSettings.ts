import { resolver } from '@blitzjs/rpc'
import { z } from 'zod'
import db from '~/db'

export default resolver.pipe(resolver.authorize(), async (input, { session: { userId } }) => {
    return await db.user.findUnique({
        where: { id: userId },
        select: {
            settingsEmailMarketing: true,
            settingsEmailProduct: true,
        },
    })
})
