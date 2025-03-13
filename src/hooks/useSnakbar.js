"use client"
import { showSnackbar } from "@/store/features/alerts";
import { useDispatch } from "react-redux";


const useSnackbar = () => {
    const dispatch = useDispatch();

    const showSuccess = (message) => {
        dispatch(showSnackbar({ message, type: "success" }));
    };

    const showError = (message) => {
        dispatch(showSnackbar({ message: message || "Something went wrong.", type: "error" }));
    };

    const showWarning = (message) => {
        dispatch(showSnackbar({ message, type: "warning" }));
    };

    const showInfo = (message) => {
        dispatch(showSnackbar({ message, type: "info" }));
    };

    return { showSuccess, showError, showWarning, showInfo };
};

export default useSnackbar;