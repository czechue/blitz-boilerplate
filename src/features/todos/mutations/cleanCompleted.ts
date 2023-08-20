import { resolver } from '@blitzjs/rpc'
import db from '~/db'

export default resolver.pipe(resolver.authorize(), async (input, { session: { userId } }) => {
    // clean completed todos
    await db.todo.deleteMany({
        where: {
            userId,
            done: true,
        },
    })
})
