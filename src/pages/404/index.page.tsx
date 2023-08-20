import Head from 'next/head'
import { NothingFoundBackground } from '@/pages/404/components/NothingFoundBackground'
import Layout from '@/core/layouts/Layout'

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
    return (
        <Layout>
            <NothingFoundBackground />
        </Layout>
    )
}
