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
import { FaUserAstronaut } from 'react-icons/fa';
import { useSocket } from '../context/SocketContext';

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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
        title: 'Username is required',
        description: 'Please enter a cool name to join the chat!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const animation = `${gradient} 15s ease infinite`;
  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(20, 20, 20, 0.2)');

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bg="linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
      backgroundSize="400% 400%"
      animation={animation}
    >
      <Box
        p={10}
        maxWidth="420px"
        borderRadius={20}
        boxShadow="xl"
        bg={glassBg}
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
        w="full"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Icon as={FaUserAstronaut} w={20} h={20} color="white" />
          <Heading size="xl" color="white" fontWeight="bold">Join the Cosmos</Heading>
          <Text fontSize="lg" color="whiteAlpha.800" textAlign="center">
            Enter your call sign to start chatting across the galaxy.
          </Text>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserAstronaut} color="whiteAlpha.600" />
              </InputLeftElement>
              <Input
                placeholder="Your awesome username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
                borderRadius="full"
                bg="whiteAlpha.300"
                color="white"
                borderColor="whiteAlpha.400"
                _placeholder={{ color: 'whiteAlpha.700' }}
                _hover={{ borderColor: 'whiteAlpha.600' }}
                focusBorderColor="white"
              />
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="whiteAlpha"
            variant="outline"
            width="full"
            type="submit"
            size="lg"
            borderRadius="full"
            fontWeight="bold"
            fontSize="lg"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Launch
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}; 