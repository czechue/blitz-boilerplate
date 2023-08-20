import { resolver } from '@blitzjs/rpc'
import { z } from 'zod'
import db from '~/db'
import { NotFoundError } from 'blitz'

const Input = z.object({
    id: z.string(),
})

export default resolver.pipe(
    resolver.zod(Input),
    resolver.authorize(),
    async (input, { session: { userId } }) => {
        const todo = await db.todo.findFirst({
            where: {
                id: input.id,
                userId: userId,
            },
            select: { done: true },
        })

        if (!todo) throw new NotFoundError('Todo not found or you are not the owner')

        return await db.todo.update({
            where: { id: input.id },
            data: {
                done: !todo.done,
            },
        })
    }
)
