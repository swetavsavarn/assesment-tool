import { NextResponse } from "next/server";
import { isDebugMode } from "./utils";

export default function middleware(request) {
    const { pathname } = request.nextUrl;

    if (!isDebugMode()) {
        if (pathname.includes("admin")) {
            // Get the auth token from cookies
            const authToken = request.cookies.get("authToken");

            // // If the user is not authenticated and trying to access an admin route, redirect to login
            if (!authToken?.value && pathname != "/admin/login") {
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }

        } else if (pathname.includes("v1") && pathname !== "/v1") {
            // // Get the auth token from cookies
            const userAuthToken = request.cookies.get("userAuthToken");

            // // // If the user is not authenticated and trying to access an admin route, redirect to login
            if (!userAuthToken?.value) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

    }



    // Allow access to all other routes
    return NextResponse.next();
}

// Apply middleware only to routes under "/admin"
export const config = {
    matcher: ['/v1/:path*', '/admin/:path*'],
};
