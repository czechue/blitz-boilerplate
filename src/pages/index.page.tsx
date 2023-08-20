import { BlitzPage, Routes } from '@blitzjs/next'
import { MainAuthenticationForm } from '@/core/components/MainAuthForm/MainAuthForm'
import { useCurrentUser } from '@/features/users/hooks/useCurrentUser'
import { Horizontal, Vertical } from 'mantine-layout-components'
import Layout from '@/core/layouts/Layout'
import { Button, Divider, Header, Text } from '@mantine/core'
import adminOnlyMutation from '@/features/auth/mutations/adminOnlyMutation'
import { useMutation } from '@blitzjs/rpc'
import Link from 'next/link'

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
    const user = useCurrentUser()
    const [$adminOnlyMutation] = useMutation(adminOnlyMutation)

    return (
        <Layout title="Home">
            {user && (
                <Vertical center fullW fullH>
                    <h1>Welcome to your new app!</h1>
                    <Text>Your role is {user.role}</Text>
                    <Link href={Routes.TodoPage()}>Go to todos</Link>
                    {user.isAdmin && (
                        <Vertical>
                            <Horizontal>
                                <Text>This is Admin Only Button:</Text>
                                <Button
                                    onClick={async () => {
                                        await $adminOnlyMutation()
                                    }}
                                >
                                    Admin Only Mutation
                                </Button>

                                <Divider />
                            </Horizontal>
                        </Vertical>
                    )}
                </Vertical>
            )}
            {!user && <MainAuthenticationForm />}
        </Layout>
    )
}

export default Home
