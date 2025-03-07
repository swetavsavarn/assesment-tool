import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const WarningModal = ({ initialOpen = false }) => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>


            {/* Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: "#1E293B", // Custom background color
                        color: "#FFFFFF", // Text color
                    },
                }}
            >
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    Work in Progress. Please check back later.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ color: "#93C5FD" }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

WarningModal.propTypes = {
    /** Initial state of the modal */
    initialOpen: PropTypes.bool,
};

export default WarningModal;
