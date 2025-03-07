"use client"
import { useState, useCallback } from 'react';

const useLoadingError = () => {
    const [loading, setLoading] = useState(false);  // To track loading state


    // Function to start loading
    const startLoading = useCallback(() => {
        setLoading(true);
    }, []);

    // Function to stop loading
    const stopLoading = useCallback(() => {
        setLoading(false);
    }, []);


    return {
        loading,
        startLoading,
        stopLoading,
    };
};

export default useLoadingError;
