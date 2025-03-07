"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideSnackbar } from "@/store/features/alerts";
import { snackbarSelector } from "@/store/features/alerts/selectors";


const GlobalSnackbar = () => {
    const dispatch = useDispatch();

    const snackbar = useSelector(snackbarSelector);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return; // Prevent closing on clickaway
        dispatch(hideSnackbar());
    };

    return (
        <Snackbar
            open={snackbar?.isVisible}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={snackbar?.type} variant="filled" sx={{ width: "100%" }}>
                {snackbar?.message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
