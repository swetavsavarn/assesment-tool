// socket.js
import io from "socket.io-client";

let socket;

export const getSocket = (authToken) => {
    if (!socket) {
        socket = io(`${process.env.NEXT_PUBLIC_API_URL}?auth_token=${authToken}`, {
            reconnection: true, // Enable reconnection
            reconnectionAttempts: 5, // 5 attempts → 10 seconds total (2s * 5)
            reconnectionDelay: 2000, // Interval between attempts (2 seconds)
            timeout: 20000, // Max connection time before giving up
            autoConnect: true, // Automatically connect
        });
    }
    return socket;
};