import { BecomeProModalComponent } from '@/modals/components/dummy-examples/BecomeProModal'
import { ReportBugModalComponent } from '@/modals/components/dummy-examples/ReportBugModal'
export { confirmDeletion } from './modal-utils'

export enum GlobalModal {
    // dummy examples
    becomePro = 'becomePro',
    reportBug = 'reportBug',
}

export const globalModals = {
    // dummy examples
    [GlobalModal.becomePro]: BecomeProModalComponent,
    [GlobalModal.reportBug]: ReportBugModalComponent,
}

declare module '@mantine/modals' {
    export interface MantineModalsOverride {
        modals: typeof globalModals
    }
}
