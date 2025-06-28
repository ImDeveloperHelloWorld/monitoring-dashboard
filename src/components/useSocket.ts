// src/hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  metricUpdate: (data: any) => void;  // adjust data type as needed
}

interface ClientToServerEvents {
  registerAgent: (agentId: string) => void;
}

export const useSocket = (agentId: string, onMetricUpdate: (data: any) => void) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    const socket = io('http://localhost:3001'); // change to your backend URL
    socketRef.current = socket;

    // Register agent ID on connect
    socket.on('connect', () => {
      socket.emit('register_agent', agentId);
      console.log('Socket connected with id:', socket.id);
    });

    // Listen to metric updates
    socket.on('metric_update', (data: any) => {
      onMetricUpdate(data);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [agentId, onMetricUpdate]);

  return socketRef.current;
};