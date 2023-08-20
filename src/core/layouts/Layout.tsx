import Head from 'next/head'
import React, { Suspense } from 'react'
import { ErrorBoundary, Routes } from '@blitzjs/next'
import { Anchor, AppShell, Header, Loader, Modal, useMantineTheme } from '@mantine/core'
import { Horizontal, Vertical } from 'mantine-layout-components'
import Link from 'next/link'
import { useCurrentUser } from '@/features/users/hooks/useCurrentUser'
import { ReactFC } from '~/types'
import { RootErrorFallback } from '@/core/components/RootErrorFallback'
import { useRouter } from 'next/router'
import { UserProfileProgress } from '@/core/components/Header/UserProfileProgress'
import { OnboardingWizzard } from '@/core/components/OnboardingWizzard'
import { UserHeaderMenu } from '@/core/components/Header/UserHeaderMenu'

const Layout: ReactFC<{
    title?: string
    hideNavbar?: boolean
}> = ({ title, hideNavbar, children }) => {
    const user = useCurrentUser()
    // const [$logout] = useMutation(logout)
    const router = useRouter()
    // const theme = useMantineTheme()

    return (
        <>
            <Head>
                <title>{title || 'Example App'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AppShell
                padding="md"
                header={
                    <Header height={60} p="xs">
                        <Horizontal fullH spaceBetween>
                            <Anchor
                                underline={false}
                                component={Link}
                                href={Routes.Home()}
                                fw="bold"
                            >
                                Example App
                            </Anchor>
                            {user && (
                                <Horizontal center>
                                    <Horizontal center spacing={'xs'}>
                                        <Horizontal>
                                            <UserHeaderMenu />

                                            <UserProfileProgress />
                                        </Horizontal>
                                    </Horizontal>

                                    {/*<DarkLightSwitch />*/}
                                </Horizontal>
                            )}
                        </Horizontal>
                    </Header>
                }
                styles={(theme) => ({
                    main: {
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                    },
                })}
            >
                <Vertical fullH fullW>
                    <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
                        <Suspense
                            fallback={
                                <Vertical center fullH fullW>
                                    <Loader />
                                </Vertical>
                            }
                        >
                            <Modal
                                size="xl"
                                centered={true}
                                closeOnClickOutside={false}
                                closeOnEscape={false}
                                withCloseButton={false}
                                title="Onboarding modal"
                                opened={!!user && !user?.onboarded}
                                onClose={() => {}}
                            >
                                <OnboardingWizzard />
                            </Modal>
                            {children}
                        </Suspense>
                    </ErrorBoundary>
                </Vertical>
            </AppShell>
        </>
    )
}

export default Layout
