import { useState } from 'react'
import { Stepper, Button, Group } from '@mantine/core'
import { useMutation } from '@blitzjs/rpc'
import markUserOnboarded from '@/features/users/mutations/markUserOnboarded'

export const OnboardingWizzard = () => {
    const [active, setActive] = useState(1)
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

    const isOnFinalStep = active === 3

    const [$markUserOnboarded, { isLoading }] = useMutation(markUserOnboarded)

    return (
        <>
            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                <Stepper.Step label="First step" description="Create an account">
                    Step 1 content: Create an account
                </Stepper.Step>
                <Stepper.Step label="Second step" description="Verify email">
                    Step 2 content: Verify email
                </Stepper.Step>
                <Stepper.Step label="Final step" description="Get full access">
                    Step 3 content: Get full access
                </Stepper.Step>
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                    Back
                </Button>
                <Button
                    loading={isLoading}
                    onClick={async () => {
                        if (isOnFinalStep) {
                            await $markUserOnboarded({})
                        } else {
                            nextStep()
                        }
                    }}
                >
                    {isOnFinalStep ? 'Finish' : 'Next'}
                </Button>
            </Group>
        </>
    )
}
