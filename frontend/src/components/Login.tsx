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
  Center,
  Link,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaUserCircle } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useSocket } from '../context/SocketContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useSocket();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: 'Username required',
        description: 'Please enter your name to continue',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(username.trim());
      onLogin();
    } catch (error) {
      toast({
        title: 'Connection error',
        description: 'Could not connect to chat server',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const inputBg = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.2)');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const buttonBg = useColorModeValue('linear(to-r, purple.500, pink.500)', 'linear(to-r, purple.300, pink.300)');

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      backgroundImage="url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'blackAlpha.600',
        zIndex: 0,
      }}
    >
      <Box
        p={{ base: 6, md: 10 }}
        maxWidth="450px"
        borderRadius="2xl"
        boxShadow="2xl"
        bg={formBg}
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.200')}
        w="full"
        mx={4}
        zIndex={1}
        animation={`${fadeIn} 0.6s ease-out forwards`}
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Center flexDirection="column">
            <Box
              animation={`${float} 4s ease-in-out infinite`}
              mb={2}
            >
              <Icon 
                as={FaUserCircle as React.ComponentType} 
                boxSize={12} 
                color={useColorModeValue('purple.500', 'purple.200')} 
              />
            </Box>
            <Heading 
              size="xl" 
              color={textColor} 
              fontWeight="700"
              textAlign="center"
              bgGradient={useColorModeValue(
                'linear(to-r, purple.600, pink.600)',
                'linear(to-r, purple.200, pink.200)'
              )}
              bgClip="text"
            >
              Welcome to Chat
            </Heading>
            <Text 
              fontSize="md" 
              color={textColor} 
              textAlign="center"
              opacity={0.8}
              mt={2}
            >
              Connect with your team in real-time
            </Text>
          </Center>

          <FormControl isRequired>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon 
                  as={FaUserCircle as React.ComponentType}
                  color={useColorModeValue('gray.500', 'gray.300')} 
                />
              </InputLeftElement>
              <Input
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                borderRadius="xl"
                bg={inputBg}
                color={textColor}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _placeholder={{ 
                  color: useColorModeValue('gray.500', 'gray.400'),
                  opacity: 0.8,
                }}
                focusBorderColor={useColorModeValue('purple.400', 'purple.300')}
                _hover={{
                  borderColor: useColorModeValue('gray.400', 'gray.500'),
                }}
              />
            </InputGroup>
          </FormControl>

          <Button
            bgGradient={buttonBg}
            color="white"
            width="full"
            type="submit"
            size="lg"
            borderRadius="xl"
            fontWeight="bold"
            fontSize="lg"
            rightIcon={<Icon as={FaArrowRight as React.ComponentType} />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            isLoading={isLoading}
            loadingText="Connecting..."
            boxShadow="md"
            transition="all 0.2s"
          >
            Join Chat
          </Button>

          <Text 
            fontSize="sm" 
            color={textColor} 
            opacity={0.7}
            textAlign="center"
          >
            By joining, you agree to our{' '}
            <Link 
              href="#" 
              color={useColorModeValue('purple.600', 'purple.300')}
              textDecoration="underline"
            >
              Terms of Service
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};