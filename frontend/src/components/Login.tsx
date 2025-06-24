import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Heading,
  useToast,
  Text,
  Avatar,
  InputGroup,
  InputLeftElement,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
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
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, blue.400, purple.500, pink.300)"
    >
      <Box
        p={10}
        maxWidth="400px"
        borderRadius={16}
        boxShadow="2xl"
        bg="whiteAlpha.900"
        w="full"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Avatar size="2xl" bg="blue.500" icon={<Icon as={FaUserCircle} w={12} h={12} />} />
          <Heading size="lg" color="blue.700">Welcome to ChatApp</Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            Enter your username to join the conversation and connect with others in real time.
          </Text>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserCircle} color="gray.400" boxSize={6} />
              </InputLeftElement>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
                borderRadius="full"
                bg="white"
                boxShadow="sm"
              />
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            size="lg"
            borderRadius="full"
            boxShadow="md"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ bg: 'blue.600' }}
          >
            Join Chat
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}; 