import React from 'react'
import Layout from '@/core/layouts/Layout'
import { Horizontal, Vertical } from 'mantine-layout-components'
import { useMutation, useQuery } from '@blitzjs/rpc'
import { Button, List, TextInput } from '@mantine/core'
import addTodo from '@/features/todos/mutations/addTodo'
import { notifications } from '@mantine/notifications'
import toggleTodo from '@/features/todos/mutations/toggleTodo'
import getTodos from '@/features/todos/queries/getTodos'
import { useForm, zodResolver } from '@mantine/form'
import cleanCompleted from '@/features/todos/mutations/cleanCompleted'
import { TodoFormProps, TodoInput } from '@/features/todos/schemas'
import { TodoItem } from '@/pages/todos/components/TodoItem'

const TodoPage = () => {
    const [todos, { isLoading: isTodosLoading }] = useQuery(getTodos, {})
    const [$addTodo, { isLoading: isAddTodoLoading }] = useMutation(addTodo)
    const [$cleanCompleted, { isLoading: isCleanCompletedLoading }] = useMutation(cleanCompleted)
    const [$toggleTodo, { isLoading: isToggleTodoLoading }] = useMutation(toggleTodo)

    const loading = isTodosLoading || isAddTodoLoading || isCleanCompletedLoading

    const form = useForm<TodoFormProps>({
        initialValues: {
            title: '',
        },
        validate: zodResolver(TodoInput),
        validateInputOnBlur: true,
    })

    return (
        <Layout title="Todos">
            <Vertical fullW center>
                <Vertical spacing={'md'}>
                    <form
                        onSubmit={form.onSubmit(async (values) => {
                            const result = await $addTodo({
                                title: values.title,
                            })

                            form.reset()

                            notifications.show({ title: 'Todo added', message: result.title })
                        })}
                    >
                        <Horizontal spaceBetween sx={{ alignItems: 'start' }}>
                            <TextInput
                                required
                                placeholder="Add todo"
                                {...form.getInputProps('title')}
                            />

                            <Button
                                loading={loading}
                                disabled={loading}
                                type="submit"
                                variant="light"
                                color="blue"
                            >
                                Add todo
                            </Button>

                            <Button
                                disabled={loading}
                                type="button"
                                variant="filled"
                                color={'red'}
                                onClick={async () => {
                                    await $cleanCompleted()
                                }}
                            >
                                Clean todos
                            </Button>
                        </Horizontal>
                    </form>

                    <List>
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                isLoading={isToggleTodoLoading}
                                onClick={async () => {
                                    await $toggleTodo({
                                        id: todo.id,
                                    })
                                }}
                            />
                        ))}
                    </List>
                </Vertical>
            </Vertical>
        </Layout>
    )
}

export default TodoPage
