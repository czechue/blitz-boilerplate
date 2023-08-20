import React from 'react'
import Layout from '@/core/layouts/Layout'
import { BlitzPage } from '@blitzjs/next'
import { Vertical } from 'mantine-layout-components'
import { Button, Text } from '@mantine/core'

export const MantineExamplePage: BlitzPage = () => {
    return (
        <Layout>
            <Vertical>
                <Text>Hello from MantineExample</Text>

                <Button variant={'gradient'}>Hello</Button>
                <Button color="ocean-blue.6" size={'xxl'}>
                    My Color
                </Button>
            </Vertical>
        </Layout>
    )
}

export default MantineExamplePage
