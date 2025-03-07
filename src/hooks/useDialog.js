'use client';

import { useState } from "react";

const useDialog = () => {


    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }


    return {
        openDialog,
        handleCloseDialog,
        handleOpenDialog
    };
};

export default useDialog;
