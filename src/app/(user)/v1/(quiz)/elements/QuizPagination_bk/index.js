"use client";
import { ButtonGroup, Stack, Button } from '@mui/material';
import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { testSelector } from '@/store/features/test/selectors';
import { goToQuestion, nextQuestion, prevQuestion } from '@/store/features/test';
import { getAttemptedQuestionsCount } from '@/utils';
import { socketSelector } from '@/store/features/socket/selectors';



const QuizPagination = () => {

    const dispatch = useDispatch()
    const { currentIndex, nextBtnDisabled, prevBtnDisabled, testInfo } = useSelector(testSelector);

    const socket = useSelector(socketSelector)


    const handlePageChange = (e, value) => {
        dispatch(goToQuestion({ idx: value - 1, socket }))
    };

    return (
        <div className="grid grid-cols-3 items-center border-b border-primary-500 p-4">
            <div></div>
            {/* Right-aligned Section */}

            {/* Empty div for center spacing */}
            <div className="flex justify-center col-span-1">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center space-x-2">
                        <Stack spacing={2} sx={{ alignItems: 'center', marginTop: 3 }}>
                            <Pagination
                                count={testInfo?.question?.length} // Total number of pages
                                page={currentIndex + 1} // Current selected page
                                onChange={handlePageChange} // Handle page change
                                shape="rounded" // Optional: Adds rounded corners to the pagination
                                sx={{
                                    '.MuiPaginationItem-root': {
                                        '&:hover': {
                                            backgroundColor: '#7DD3FC', // Change background color on hover
                                            color: 'black', // Change text color on hover
                                        },
                                    },
                                }}
                            />
                        </Stack>
                    </div>
                    {/* Attempted Questions */}
                    <div className="text-sm text-white mt-2">Attempted: {getAttemptedQuestionsCount(testInfo)}/{testInfo?.question?.length}</div>
                </div>
            </div>
            <div className="col-span-1 text-right p-4">
                {/* <button>Test</button> */}
                <ButtonGroup variant="outlined" color="primary" className="ml-4">
                    {/* <Button size='small'>Prev</Button> */}
                    <Button
                        size="small"
                        sx={{
                            borderColor: '#7DD3FC', // Set border color
                            color: '#7DD3FC', // Set text color
                            '&:hover': {
                                backgroundColor: '#7DD3FC', // Set background on hover
                                color: 'black', // Set text color on hover
                            },
                            '&:disabled': {
                                borderColor: '#7DD3FC', // Set border color
                                backgroundColor: '#7DD3FC', // Set background on hover
                                color: 'black', // Set text color on hover
                            },
                        }}
                        disabled={prevBtnDisabled}
                        onClick={() => {
                            dispatch(prevQuestion({ socket }))
                        }}
                    >
                        Prev
                    </Button>
                    <Button
                        size="small"
                        sx={{
                            borderColor: '#7DD3FC', // Set border color
                            color: '#7DD3FC', // Set text color
                            '&:hover': {
                                backgroundColor: '#7DD3FC', // Set background on hover
                                color: 'black', // Set text color on hover
                            },
                            '&:disabled': {
                                borderColor: '#7DD3FC', // Set border color
                                backgroundColor: '#7DD3FC', // Set background on hover
                                color: 'black', // Set text color on hover
                            },
                        }}
                        disabled={nextBtnDisabled}
                        onClick={() => {
                            dispatch(nextQuestion({ socket }))
                        }}
                    >
                        Next
                    </Button>
                </ButtonGroup>
            </div>


        </div>
    );
};

export default QuizPagination;
