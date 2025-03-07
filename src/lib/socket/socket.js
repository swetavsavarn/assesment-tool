// socket.js
import io from "socket.io-client";

let socket;

export const getSocket = (authToken) => {
    if (!socket) {
        socket = io(`${process.env.NEXT_PUBLIC_API_URL}?auth_token=${authToken}`, {
            reconnection: false,
        });
    }
    return socket;
};
