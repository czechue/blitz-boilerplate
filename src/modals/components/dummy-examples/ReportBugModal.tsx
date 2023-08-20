import { ReactFC } from '~/types'
import { ContextModalProps } from '@mantine/modals'
import { Text } from '@mantine/core'
import { Horizontal, Vertical } from 'mantine-layout-components'
import { Button, Title } from '@mantine/core'

type InnerProps = {
    description: string
}

export const ReportBugModalComponent: ReactFC<ContextModalProps<InnerProps>> = ({
    context,
    id,
    innerProps,
}) => {
    const { description } = innerProps

    const handleCloseModal = () => context.closeModal(id)

    return (
        <Vertical fullW spacing={15}>
            <Vertical>
                <Text>{description}</Text>
            </Vertical>
            <Horizontal fullW spaceBetween>
                <Button color="gray" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        console.log('submit')
                    }}
                >
                    Submit
                </Button>
            </Horizontal>
        </Vertical>
    )
}
