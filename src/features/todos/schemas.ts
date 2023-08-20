import { z } from 'zod'

export const TodoInput = z.object({
    title: z.string().min(3).max(100),
})

export type TodoFormProps = z.infer<typeof TodoInput>
