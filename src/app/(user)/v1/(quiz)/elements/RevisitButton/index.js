import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { currentQuestionSelector, currentSectionSelector, testSelector } from '@/store/features/test/selectors';
import { revisitLater } from '@/store/features/test';
import { socketSelector } from '@/store/features/socket/selectors';
import { fireEventWithAck } from '@/utils';
import { SOCKET_EVENTS } from '@/lib/socket/events';
import { CONSTANTS } from '@/constants';

const { TEST_SECTIONS } = CONSTANTS

const RevisitButton = () => {
    const dispatch = useDispatch();
    const testState = useSelector(testSelector); // Access the entire test state
    const currentQuestion = useSelector(currentQuestionSelector);

    const isReview = currentQuestion?.status === "review";

    const socket = useSelector(socketSelector)
    const currentSection = useSelector(currentSectionSelector)

    return (
        <div className="text-lg font-semibold flex justify-between">
            <span> Question {currentSection == TEST_SECTIONS.MCQ ? testState?.currentIndex + 1 : testState?.currentProgramIndex + 1}</span>
            <button
                className={`text-sm mt-auto self-start flex items-center gap-2 ${isReview ? "text-yellow-600" : "text-white"
                    }`}
                onClick={() => {
                    dispatch(revisitLater());
                    fireEventWithAck(socket, {
                        eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
                        payload: {
                            questionStatus: {
                                [currentQuestion?.id]: isReview ? "" : "review"
                            }
                        }
                    })
                }}
            >
                {isReview ? (
                    <BookmarkIcon className="text-blue-300" />
                ) : (
                    <BookmarkBorderIcon className=" text-yellow-700" />
                )}
                <span className={isReview ? "text-blue-300 " : "text-yellow-700"}>{isReview ? "Mark as Complete" : "Revisit Later"}</span>
            </button>
        </div>
    );
};

export default RevisitButton;
