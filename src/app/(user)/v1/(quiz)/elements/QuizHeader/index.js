"use client"

import { useSelector } from "react-redux";
import { testSelector } from "@/store/features/test/selectors";
import CountDownTime from "@/components/atoms/CountdownTimer";
import FullScreenButton from "@/components/atoms/FullScreenButton";
import { userAuthSelector } from "@/store/features/userAuth/selectors";
import FinishButton from "../FinishButton";

function QuizHeader() {




    const userAuth = useSelector(userAuthSelector);
    const { nextBtnDisabled } = useSelector(testSelector);



    return (
        <div className="bg-primary-300 text-white px-4 py-5 grid grid-cols-3">
            {/* Left Section - Logo and User Info */}
            <div className="flex items-center space-x-4">
                {/* Logo */}
                <img
                    src="/logo.svg"
                    alt="Zeus | Crebos"
                    className="h-12"
                />
                {/* Test Info */}
                <div>
                    <div className="text-sm font-semibold">{userAuth?.user?.candidateName || "Gurwinder Singh"}</div>
                    <div className="text-xs">{userAuth?.user?.candidateJobPosition} Assessment</div>
                </div>
            </div>

            <div className="flex justify-center items-center text-sm  rounded-2xl px-3 py-2 gap-x-2">

                <span className="flex items-end text-xl font-extrabold animate-bounce">
                    <CountDownTime />
                </span>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center justify-end space-x-2">
                {/* Full Screen Button */}
                <FullScreenButton />

                {/* Finish Test */}
                {!nextBtnDisabled && <FinishButton sx={{ paddingBlock: "6px", paddingInline: "20px", borderRadius: "10px" }} />}
            </div>
        </div>
    );
}

export default QuizHeader;
