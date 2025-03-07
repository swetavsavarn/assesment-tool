"use client"

import useSocket from '@/hooks/useSocket';
import React from 'react';




const SocketManager = () => {

    useSocket()




    return null;  // This component does not render anything, it just manages the socket lifecycle
};

export default React.memo(SocketManager);
