import { Vertical } from 'mantine-layout-components'
import { Loader } from '@mantine/core'

export const FullPageLoader = () => {
    return (
        <Vertical mih="100vh" miw="100vw" center fullW fullH>
            <Loader />
        </Vertical>
    )
}
