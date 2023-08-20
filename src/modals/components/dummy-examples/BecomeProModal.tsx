import { ReactFC } from '~/types'
import { ContextModalProps } from '@mantine/modals'
import { Horizontal, Vertical } from 'mantine-layout-components'
import { Button, Modal } from '@mantine/core'
import { useState } from 'react'

type InnerProps = {}

export const BecomeProModalComponent: ReactFC<ContextModalProps<InnerProps>> = ({
    context,
    id,
    innerProps,
}) => {
    const {} = innerProps

    const handleCloseModal = () => context.closeModal(id)

    const [tellMeMoreOpened, setTellMeMoreOpened] = useState(false)

    // NOTE: This is a solution to stack modals on top of each other
    return (
        <Vertical fullW spacing={15}>
            <Vertical>
                <Button
                    onClick={() => {
                        setTellMeMoreOpened(true)
                    }}
                >
                    Show Nested Modal
                </Button>

                <Modal
                    zIndex={210}
                    overlayProps={{
                        blur: 2,
                    }}
                    opened={tellMeMoreOpened}
                    onClose={() => setTellMeMoreOpened(false)}
                >
                    More info about becoming pro
                </Modal>
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
