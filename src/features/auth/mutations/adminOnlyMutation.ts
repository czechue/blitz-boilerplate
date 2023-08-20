import { resolver } from '@blitzjs/rpc'
import { z } from 'zod'

const Input = z.object({})

export default resolver.pipe(
    resolver.authorize('ADMIN'),
    async (input, { session: { userId } }) => {
        console.log('Only Admin', userId)
    }
)
