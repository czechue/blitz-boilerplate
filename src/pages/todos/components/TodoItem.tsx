import { PromiseReturnType } from 'blitz'
import getTodos from '@/features/todos/queries/getTodos'
import { ReactFC } from '~/types'
import { Horizontal } from 'mantine-layout-components'
import { Checkbox, Text } from '@mantine/core'
import React from 'react'

type TodoItem = PromiseReturnType<typeof getTodos>[number]

export const TodoItem: ReactFC<{
    todo: TodoItem
    isLoading: boolean
    onClick: (id: string) => Promise<void>
}> = ({ todo, isLoading, onClick }) => {
    return (
        <Horizontal key={todo.id}>
            <Checkbox
                disabled={isLoading}
                defaultChecked={todo.done}
                onClick={() => onClick(todo.id)}
            />

            <Text>{todo.title}</Text>
        </Horizontal>
    )
}
