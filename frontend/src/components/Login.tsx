import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useSocket } from '../context/SocketContext';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const { login } = useSocket();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      onLogin();
    } else {
      toast({
        title: 'Username required',
        description: 'Please enter a username to join the chat',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading size="lg">Join Chat</Heading>
          <FormControl isRequired>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            size="lg"
          >
            Join
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}; 