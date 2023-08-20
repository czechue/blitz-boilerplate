import { resolver } from '@blitzjs/rpc'
import { z } from 'zod'
import db from '../../../../db'

export const Todo = z.object({})

export default resolver.pipe(
    resolver.zod(Todo),
    resolver.authorize(),
    async ({}, { session: { userId } }) => {
        const todos = db.todo.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: { id: true, title: true, done: true },
        })

        return todos
    }
)
