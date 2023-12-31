import { resolver } from '@blitzjs/rpc'
import { Role } from '~/types'
import { LoginInput } from '../schemas'
import { authenticateUser } from '../utils/authenticateUser'

export default resolver.pipe(resolver.zod(LoginInput), async ({ email, password }, ctx) => {
    // This throws an error if credentials are invalid
    const user = await authenticateUser(email, password)

    await ctx.session.$create({ userId: user.id, role: user.role as Role })

    return user
})
