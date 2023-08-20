import { useQuery } from '@blitzjs/rpc'
import getTodos from '@/features/todos/queries/getTodos'

export const useTodos = () => {
    const [todos] = useQuery(getTodos, {})
    return todos
}
