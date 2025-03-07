"use client"
import Button from '@/components/atoms/Button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';

const Page = () => {
    const [isAgreed, setIsAgreed] = useState(false)

    const router = useRouter()

    // Handle agreement checkbox change
    const handleAgreeChange = (e) => {
        setIsAgreed(e.target.checked)
    }

    // Handle the "Next" button click
    const handleNextClick = () => {
        router.push("/v1/pre-test-window#permissions-section")
    }

    return (
        <main className="flex-grow flex my-4 items-center justify-center bg-primary-300">
            <div className="bg-primary-200 shadow-md rounded-md w-full max-w-3xl">

                <div className="bg-primary-200 p-6 rounded-md">
                    <h3 className="text-xl font-semibold mb-4 text-white">Test Guidelines</h3>
                    <ul className="pl-6 list-disc space-y-3 mb-2 text-white list-outside">
                        <li className='whitespace-nowrap'>Ensure a stable internet connection throughout the test to avoid any disruptions.</li>
                        <li>Use the latest version of Google Chrome for the best experience.</li>
                        <li>Grant access to your microphone and webcam for identity verification.</li>
                        <li>Screen monitoring will be active during the test for security purposes.</li>
                        <li>Close all other applications to avoid interruptions or distractions.</li>
                        <li>Unstable internet or interruptions may result in test failure.</li>
                        <li className='whitespace-nowrap'>Avoid using the back button or refreshing the test window to prevent disqualification.</li>
                        <li>AI face detection is active throughout the test. Please keep your eyes on the screen to ensure compliance.</li>
                    </ul>

                    <div className="flex items-center mb-2">
                        <Checkbox
                            id="agree"
                            className="mr-2"
                            onChange={handleAgreeChange}
                        />
                        <label htmlFor="agree" className="text-white cursor-pointer">
                            I agree to the terms and conditions.
                        </label>
                    </div>

                    <div className="flex justify-end items-center">
                        <Button
                            disabled={!isAgreed}
                            onClick={handleNextClick}
                        >
                            Next
                        </Button>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Page
