import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Input,
  VStack,
  HStack,
  IconButton,
  useToast,
  Text,
  Flex,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { ArrowForwardIcon, MoonIcon, SunIcon, AddIcon } from '@chakra-ui/icons';
import { useSocket } from '../context/SocketContext';
import { ChatMessage } from './ChatMessage';
import { UserList } from './UserList';

let typingTimeout: NodeJS.Timeout;

export const Chat: React.FC = () => {
  const { messages, users, typingUsers, sendMessage, setTyping, socket } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage('');
    } else {
      toast({
        title: 'Empty message',
        description: 'Please enter a message to send',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 1000);
  };

  // Get current username for isOwnMessage
  const currentUser = users.find(u => u.id === socket?.id)?.username;

  return (
    <Flex h="100vh" direction={{ base: 'column', md: 'row' }} bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      {/* Sidebar/UserList */}
      <Box display={{ base: 'none', md: 'block' }}>
        <UserList users={users} typingUsers={typingUsers} />
      </Box>
      {/* Main Chat Area */}
      <Flex flex={1} direction="column" h="100%">
        {/* Header */}
        <Flex align="center" justify="space-between" px={6} py={4} bgGradient="linear(to-r, blue.600, blue.400)" color="white" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold" letterSpacing="wide">💬 ChatApp</Text>
          <HStack spacing={2}>
            <Button onClick={toggleColorMode} size="sm" leftIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}>{colorMode === 'dark' ? 'Light' : 'Dark'} Mode</Button>
          </HStack>
        </Flex>
        {/* Messages */}
        <VStack flex={1} px={4} py={2} spacing={2} overflowY="auto" align="stretch" bg={colorMode === 'dark' ? 'gray.800' : 'white'}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.user === currentUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </VStack>
        {/* Input */}
        <Box px={4} py={3} bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'} boxShadow="md" position="sticky" bottom={0} zIndex={10}>
          <form onSubmit={handleSend}>
            <HStack spacing={2}>
              {/* Emoji picker placeholder */}
              <IconButton icon={<AddIcon />} aria-label="Add emoji" variant="ghost" size="lg" />
              <Input
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message..."
                size="lg"
                bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                color={colorMode === 'dark' ? 'white' : 'black'}
                borderRadius="full"
                boxShadow="sm"
              />
              <IconButton
                colorScheme="blue"
                aria-label="Send message"
                icon={<ArrowForwardIcon />}
                type="submit"
                size="lg"
                borderRadius="full"
              />
            </HStack>
          </form>
        </Box>
      </Flex>
      {/* Mobile UserList at bottom */}
      <Box display={{ base: 'block', md: 'none' }} w="100%" boxShadow="md">
        <UserList users={users} typingUsers={typingUsers} />
      </Box>
    </Flex>
  );
}; 