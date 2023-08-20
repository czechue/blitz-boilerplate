import { resolver } from '@blitzjs/rpc'
import { z } from 'zod'
import db from '~/db'
import { TodoInput } from '@/features/todos/schemas'

export default resolver.pipe(
    resolver.zod(TodoInput),
    resolver.authorize(),
    async (input, { session: { userId } }) => {
        const todo = await db.todo.create({
            data: {
                title: input.title,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })

        return todo
    }
)
