import React, { useState } from 'react';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { SocketProvider } from './context/SocketContext';
import { Login } from './components/Login';
import { Chat } from './components/Chat';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
 