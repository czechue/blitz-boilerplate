import React from 'react'
import Layout from '@/core/layouts/Layout'
import { BlitzPage, useParam } from '@blitzjs/next'
import { Vertical } from 'mantine-layout-components'
import { Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useQuery } from '@blitzjs/rpc'
import verifyEmailToken from '@/features/auth/queries/verifyEmailToken'

export const VerifyEmailPage: BlitzPage = () => {
    const { query } = useRouter()
    const [result, { isSuccess, error }] = useQuery(
        verifyEmailToken,
        { token: query.token as string },
        { enabled: !!query.token }
    )
    return (
        <Layout>
            <Vertical>
                <Text>Hello from VerifyEmail</Text>
                token is {query.token}
                {result && isSuccess && <Text>result is {JSON.stringify(result)}</Text>}
            </Vertical>
        </Layout>
    )
}

export default VerifyEmailPage
