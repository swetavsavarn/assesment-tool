import { useEffect } from "react";

const useDisableKeys = () => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
            const isCmd = isMac ? event.metaKey : event.ctrlKey;

            if (
                (isCmd && event.key.toLowerCase() === "c") || // Cmd/Ctrl + C
                (isCmd && event.key.toLowerCase() === "v") || // Cmd/Ctrl + V
                (isCmd && event.key.toLowerCase() === "s")    // Cmd/Ctrl + S
            ) {
                event.preventDefault();
                console.log(`Blocked: ${event.key}`);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
};

export default useDisableKeys;
