import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, User, TypingStatus } from '../types';

interface SocketContextType {
  socket: Socket | null;
  messages: Message[];
  users: User[];
  typingUsers: TypingStatus[];
  sendMessage: (message: string) => void;
  login: (username: string) => void;
  setTyping: (isTyping: boolean) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  messages: [],
  users: [],
  typingUsers: [],
  sendMessage: () => {},
  login: () => {},
  setTyping: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingStatus[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('previousMessages', (previousMessages: Message[]) => {
      setMessages(previousMessages);
    });

    newSocket.on('userList', (userList: User[]) => {
      setUsers(userList);
    });

    newSocket.on('userTyping', (typingStatus: TypingStatus) => {
      setTypingUsers((prev) => {
        const filtered = prev.filter((status) => status.user !== typingStatus.user);
        if (typingStatus.isTyping) {
          return [...filtered, typingStatus];
        }
        return filtered;
      });
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  const login = (username: string) => {
    if (socket) {
      socket.emit('login', username);
    }
  };

  const setTyping = (isTyping: boolean) => {
    if (socket) {
      socket.emit('typing', isTyping);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        users,
        typingUsers,
        sendMessage,
        login,
        setTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}; 