import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmRefresh = ({
    open,
    onClose,
    onConfirm,
    message = "Refreshing the page will log you out of the test. Are you sure you want to proceed?",
    title = "Confirm Refresh",
    cancelButtonText = "Cancel",
    confirmButtonText = "Refresh",
}) => {
    const handleConfirm = () => {
        onConfirm(); // Execute the refresh action
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: "#1E293B", // Custom background color
                    color: "#FFFFFF", // Text color for better contrast
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {cancelButtonText}
                </Button>
                <Button onClick={handleConfirm} color="secondary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmRefresh.propTypes = {
    /** Controls whether the dialog is open or not */
    open: PropTypes.bool.isRequired,

    /** Callback function to handle closing the dialog */
    onClose: PropTypes.func.isRequired,

    /** Callback function to handle confirm action (refresh) */
    onConfirm: PropTypes.func.isRequired,

    /** Message to display in the dialog content */
    message: PropTypes.string,

    /** Title for the dialog */
    title: PropTypes.string,

    /** Text for the cancel button */
    cancelButtonText: PropTypes.string,

    /** Text for the confirm button */
    confirmButtonText: PropTypes.string,
};

export default ConfirmRefresh;
