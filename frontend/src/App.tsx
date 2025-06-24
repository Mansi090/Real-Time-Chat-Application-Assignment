import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SocketProvider } from './context/SocketContext';
import { Login } from './components/Login';
import { Chat } from './components/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider>
      <SocketProvider>
        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <Chat />
        )}
      </SocketProvider>
    </ChakraProvider>
  );
}

export default App;
