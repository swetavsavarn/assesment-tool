import React from 'react'
import FinishTestDialog from '../FinishTestDialog'
import useDialog from '@/hooks/useDialog';
import { userAuthSelector } from '@/store/features/userAuth/selectors';
import { socketSelector } from '@/store/features/socket/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/atoms/Button';
import { finishTest } from '@/store/features/test';

const FinishButton = ({ sx = {} }) => {

    const dispatch = useDispatch()
    const { openDialog, handleCloseDialog, handleOpenDialog } = useDialog();

    const userAuth = useSelector(userAuthSelector);
    const socket = useSelector(socketSelector)

    return (
        <>
            <Button
                size="small"
                variant="contained"
                sx={{
                    borderColor: '#7DD3FC', // Set border color
                    color: '#7DD3FC', // Set text color
                    background: "#7DD3FC",
                    color: 'black',
                    '&:hover': {
                        backgroundColor: '#7DD3FC', // Set background on hover
                        color: 'black', // Set text color on hover
                    },
                    ...sx,
                }}
                onClick={() => {
                    handleOpenDialog()
                    dispatch(finishTest({ socket }))
                }}
            >
                Finish Test
            </Button>
            <FinishTestDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} handleOpenDialog={handleOpenDialog} /></>
    )
}

export default FinishButton