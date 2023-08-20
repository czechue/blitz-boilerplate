import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'
import React from 'react'

interface Options {
    onCancel?: () => void
    text?: string
    title?: string
    confirmLabel?: string
    cancelLabel?: string
}

export const confirmDeletion = (cb, options: Options = {}) => {
    const {
        onCancel,
        text = 'Are you sure you want to delete this? This action might be irreversible.',
        title = 'Confirm deletion',
        confirmLabel = 'Delete',
        cancelLabel = 'Cancel',
    } = options

    modals.openConfirmModal({
        title,
        centered: true,
        children: <Text size="sm">{text}</Text>,
        labels: { confirm: confirmLabel, cancel: cancelLabel },
        confirmProps: { color: 'red' },
        onCancel,
        onConfirm: () => {
            cb?.()
        },
    })
}
