import React from "react";
// import { getCookie } from 'cookies-next';
import { redirect } from "next/navigation";
import LoginForm from "./elements/LoginForm";
import { CONSTANTS } from "@/constants";
import { cookies } from 'next/headers';



const LoginPage = () => {


    // const authToken = getCookie(CONSTANTS.COOKIE_NAME.ADMIN);

    const cookieStore = cookies(); // Get cookies object
    const authToken = cookieStore.get(CONSTANTS.COOKIE_NAME.ADMIN); // Replace 'myCookieName' with the name of your cookie


    if (authToken?.value) {
        redirect("/admin/dashboard")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a]">
            <div className="text-center mb-10">
                <img
                    src="../logo.svg" // Replace with your logo URL
                    alt="Logo"
                    className="mx-auto"
                />
                <h1 className="text-2xl font-semibold text-gray-100 mt-4">
                    Welcome to
                </h1>
                <p className="text-gray-400">Zestful Empowering Utilization System</p>
            </div>
            <div className="w-full max-w-md p-8 bg-[#1e293b] rounded-lg shadow-lg">

                <h2 className="text-xl font-bold text-gray-100 mb-6 text-center" id="login">Login</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
