import { AppProps, ErrorBoundary } from '@blitzjs/next'
import React from 'react'
import { withBlitz } from 'src/blitz-client'
import { RootErrorFallback } from '@/core/components/RootErrorFallback'
import { Suspense } from 'react'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { FullPageLoader } from '@/core/components/FullPageLoader'
import { ModalsProvider } from '@mantine/modals'
import { globalModals } from '@/modals'
import { mantineTheme } from '@/styles/mantine-theme'
import { useLocalStorage } from '@mantine/hooks'

function MyApp({ Component, pageProps }: AppProps) {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    })
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ ...mantineTheme, colorScheme }}
            >
                <ModalsProvider modals={globalModals}>
                    <ErrorBoundary FallbackComponent={RootErrorFallback}>
                        <Notifications position="top-right" />
                        <Suspense fallback={<FullPageLoader />}>
                            <Component {...pageProps} />
                        </Suspense>
                    </ErrorBoundary>
                </ModalsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default withBlitz(MyApp)
