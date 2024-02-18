// useSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    auth: {
        a: 'b',
    },
});
