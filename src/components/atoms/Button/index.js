import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";

// Styled Button for Primary Variant
const PrimaryButton = styled(MuiButton)(({ theme }) => ({
    backgroundColor: "#7DD3FC", // Light blue background color
    color: "black", // Text color
    fontWeight: "bold", // Bold text
    borderRadius: "50px", // Fully rounded corners
    padding: "10px 20px", // Padding for the button
    textTransform: "none", // Prevent text capitalization
    "&:hover": {
        backgroundColor: "#7DD3FC", // Same hover color as background
    },
    "&:disabled": {
        backgroundColor: "#7DD3FC45", // Same hover color as background
    },
}));

// Styled Button for Secondary Variant
const SecondaryButton = styled(MuiButton)(({ theme }) => ({
    backgroundColor: "#334155", // Amber background color
    color: "white", // Text color
    fontWeight: "bold", // Bold text
    borderRadius: "50px", // Fully rounded corners
    padding: "10px 20px", // Padding for the button
    textTransform: "none", // Prevent text capitalization
    "&:hover": {
        // backgroundColor: "#FBBF24", // Same hover color as background
    },
}));

const Button = ({ children, variant = "primary", ...props }) => {
    if (variant === "secondary") {
        return <SecondaryButton {...props}>{children}</SecondaryButton>;
    }
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
};

export default Button;
