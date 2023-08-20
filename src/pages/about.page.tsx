import React from 'react'
import Layout from '@/core/layouts/Layout'
import { Horizontal, Vertical } from 'mantine-layout-components'
import { BlitzPage } from '@blitzjs/next'

const AboutPage: BlitzPage = () => {
    return (
        <Layout title="About">
            <Vertical fullH debug spacing="xl" center>
                <Vertical fullH debug spacing="md">
                    <div>This is the about page</div>
                    <div>This is the about page</div>
                    <div>This is the about page</div>
                    <div>This is the about page</div>
                </Vertical>
                <Vertical fullH debug spacing="md">
                    <div>This is the about page</div>
                    <div>This is the about page</div>
                    <div>This is the about page</div>
                    <div>This is the about page</div>
                </Vertical>
            </Vertical>
        </Layout>
    )
}

AboutPage.authenticate = true

export default AboutPage
