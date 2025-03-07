import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmDelete = ({
    open,
    onClose,
    onDelete,
    message = "Are you sure you want to delete this item?",
    title = "Confirm Deletion",
    cancelButtonText = "Cancel",
    deleteButtonText = "Delete",
}) => {
    const handleConfirm = () => {
        onDelete(); // Execute the delete action
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{
            "& .MuiDialog-paper": {
                backgroundColor: "#1E293B", // Custom background color
            },
        }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" sx={{ color: "#93C5FD" }}>
                    {cancelButtonText}
                </Button>
                <Button onClick={handleConfirm} color="primary" sx={{ color: "#EF4444" }}>
                    {deleteButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDelete.propTypes = {
    /** Controls whether the dialog is open or not */
    open: PropTypes.bool.isRequired,

    /** Callback function to handle closing the dialog */
    onClose: PropTypes.func.isRequired,

    /** Callback function to handle delete action */
    onDelete: PropTypes.func.isRequired,

    /** Message to display in the dialog content */
    message: PropTypes.string,

    /** Title for the dialog */
    title: PropTypes.string,

    /** Text for the cancel button */
    cancelButtonText: PropTypes.string,

    /** Text for the delete button */
    deleteButtonText: PropTypes.string,
};

export default ConfirmDelete;
