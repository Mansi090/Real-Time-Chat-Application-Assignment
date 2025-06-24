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
  InputGroup,
  InputLeftElement,
  Flex,
  Icon,
  useColorModeValue,
  keyframes
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useSocket } from '../context/SocketContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
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
        title: 'Username is required.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formBg = useColorModeValue('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)');
  const inputBg = useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(0, 0, 0, 0.7)');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      backgroundImage="url('https://images.unsplash.com/photo-1489599849927-2ee91e3464ca?q=80&w=2070&auto=format&fit=crop')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        p={10}
        maxWidth="450px"
        borderRadius={20}
        boxShadow="2xl"
        bg={formBg}
        backdropFilter="blur(15px) saturate(180%)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        w="full"
        animation={`${fadeIn} 0.7s ease-out`}
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading size="xl" color={textColor} fontWeight="600">
            Welcome Back
          </Heading>
          <Text fontSize="md" color={textColor} textAlign="center">
            Enter your name to start chatting with your team.
          </Text>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserCircle} color={useColorModeValue('gray.500', 'gray.300')} />
              </InputLeftElement>
              <Input
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
                borderRadius="lg"
                bg={inputBg}
                color={textColor}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
                focusBorderColor={useColorModeValue('blue.400', 'blue.300')}
              />
            </InputGroup>
          </FormControl>
          <Button
            bg={useColorModeValue('blue.500', 'blue.400')}
            color="white"
            width="full"
            type="submit"
            size="lg"
            borderRadius="lg"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
            boxShadow="lg"
          >
            Join Chat
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}; 