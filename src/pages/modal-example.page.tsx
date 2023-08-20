import React from 'react'
import Layout from '@/core/layouts/Layout'
import { BlitzPage } from '@blitzjs/next'
import { Vertical } from 'mantine-layout-components'
import { Button, Text } from '@mantine/core'
import { modals, openContextModal } from '@mantine/modals'
import { confirmDeletion, GlobalModal } from '@/modals'

// More about modals
//https://mantine.dev/others/modals/

export const ModalExamplePage: BlitzPage = () => {
    const fakeDeleteAccountMutation = () => {
        console.log('delete account')
    }

    const openConfirmModal = () =>
        modals.openConfirmModal({
            title: 'Please confirm your action',
            children: (
                <Text size="sm">
                    This action is so important that you are required to confirm it with a modal.
                    Please click one of these buttons to proceed.
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => console.log('Confirmed'),
        })

    return (
        <Layout>
            <Vertical>
                <Text>Hello from ModalExample</Text>

                <Button
                    onClick={() => {
                        confirmDeletion(fakeDeleteAccountMutation, {
                            text: 'Are you sure you want to delete your account?',
                            title: 'Delete account',
                            confirmLabel: 'Delete',
                            cancelLabel: 'Cancel',
                        })
                    }}
                    color="red"
                >
                    Delete account
                </Button>

                <Button onClick={openConfirmModal}>Open confirm modal</Button>

                <Button
                    onClick={() => {
                        openContextModal({
                            modal: GlobalModal.becomePro,
                            title: 'Become Pro',
                            size: 'xl',
                            innerProps: {
                                description: 'Hello from Become Pro Modal',
                            },
                        })
                    }}
                >
                    Become Pro
                </Button>
                <Button
                    onClick={() => {
                        openContextModal({
                            modal: GlobalModal.reportBug,
                            title: 'Report a bug',
                            size: 'xl',
                            innerProps: {
                                description: 'Something is not working as expected? Let us know!',
                            },
                        })
                    }}
                >
                    Report a bug
                </Button>
            </Vertical>
        </Layout>
    )
}

export default ModalExamplePage
