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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon, MoonIcon, SunIcon, AddIcon } from '@chakra-ui/icons';
import { useSocket } from '../context/SocketContext';
import { ChatMessage } from './ChatMessage';
import { UserList } from './UserList';

let typingTimeout: NodeJS.Timeout;

export const Chat: React.FC = () => {
  const { messages, users, typingUsers, sendMessage, setTyping, socket } = useSocket();
  const [newMessage, setNewMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  // Modern color scheme
  const bgGradient = useColorModeValue(
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
  );
  const chatBg = useColorModeValue(
    'rgba(255, 255, 255, 0.95)',
    'rgba(26, 32, 44, 0.95)'
  );
  const headerBg = useColorModeValue(
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)'
  );
  const inputBg = useColorModeValue(
    'rgba(255, 255, 255, 0.9)',
    'rgba(45, 55, 72, 0.9)'
  );
  const sidebarBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  );

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

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

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmoji(false);
  };

  // Get current username for isOwnMessage
  const currentUser = users.find(u => u.id === socket?.id)?.username;

  // Animated typing indicator
  const typingUsernames = typingUsers.filter(t => t.isTyping && t.user !== currentUser).map(t => t.user);
  const isSomeoneTyping = typingUsernames.length > 0;

  return (
    <Flex 
      h="100vh"
      minH={0}
      direction={{ base: 'column', md: 'row' }} 
      bg={bgGradient}
      backgroundAttachment="fixed"
      position="relative"
      overflow="hidden"
    >
      {/* Animated background particles */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        pointerEvents="none"
        zIndex="0"
      >
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            w="4px"
            h="4px"
            bg="white"
            borderRadius="50%"
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            animation={`float ${3 + Math.random() * 4}s ease-in-out infinite`}
            style={{
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </Box>

      {/* Sidebar/UserList */}
      <Box 
        display={{ base: 'none', md: 'block' }}
        position="relative"
        zIndex="1"
      >
        <UserList users={users} typingUsers={typingUsers} />
      </Box>

      {/* Main Chat Area */}
      <Flex 
        flex={1} 
        minH={0}
        direction="column" 
        position="relative"
        zIndex="1"
      >
        {/* Header */}
        <Flex 
          align="center" 
          justify="space-between" 
          px={6} 
          py={4} 
          bg={headerBg}
          color="white" 
          boxShadow="0 4px 20px rgba(0,0,0,0.1)"
          backdropFilter="blur(20px)"
          borderBottom="1px solid rgba(255,255,255,0.1)"
        >
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            letterSpacing="wide"
            bgGradient="linear(to-r, #ffd89b, #19547b)"
            bgClip="text"
            textShadow="0 2px 4px rgba(0,0,0,0.3)"
          >
            ✨ ChatApp
          </Text>
          <HStack spacing={3}>
            <Button 
              onClick={toggleColorMode} 
              size="sm" 
              leftIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              bg="rgba(255,255,255,0.2)"
              _hover={{ bg: 'rgba(255,255,255,0.3)' }}
              backdropFilter="blur(10px)"
              border="1px solid rgba(255,255,255,0.2)"
            >
              {colorMode === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
          </HStack>
        </Flex>

        {/* Messages */}
        <VStack 
          flex={1} 
          minH={0}
          px={4} 
          py={2} 
          spacing={2} 
          align="stretch" 
          bg={chatBg}
          backdropFilter="blur(20px)"
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(0,0,0,0.5)',
            },
          }}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.user === currentUser}
            />
          ))}
          {/* Typing indicator */}
          {isSomeoneTyping && (
            <Box pb={2} pl={2}>
              <HStack>
                <Text fontSize="sm" color="purple.400" fontWeight="medium">
                  {typingUsernames.join(', ')} {typingUsernames.length > 1 ? 'are' : 'is'} typing
                </Text>
                <Box display="inline-block" ml={1}>
                  <span className="typing-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </Box>
              </HStack>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </VStack>

        {/* Input */}
        <Box 
          px={4} 
          py={3} 
          bg={inputBg}
          backdropFilter="blur(20px)"
          boxShadow="0 -4px 20px rgba(0,0,0,0.1)"
          position="sticky" 
          bottom={0} 
          zIndex={10}
          borderTop="1px solid rgba(255,255,255,0.1)"
        >
          <form onSubmit={handleSend}>
            <HStack spacing={3}>
              {/* Emoji picker */}
              <Popover isOpen={showEmoji} onClose={() => setShowEmoji(false)} placement="top-start">
                <PopoverTrigger>
                  <IconButton 
                    icon={<span role="img" aria-label="emoji">😊</span>} 
                    aria-label="Add emoji" 
                    variant="ghost" 
                    size="lg" 
                    onClick={() => setShowEmoji((v) => !v)}
                    bg="rgba(255,255,255,0.2)"
                    _hover={{ bg: 'rgba(255,255,255,0.3)' }}
                    borderRadius="full"
                  />
                </PopoverTrigger>
                <PopoverContent w="auto" borderRadius="xl" boxShadow="xl" bg="rgba(255,255,255,0.95)" backdropFilter="blur(20px)">
                  <PopoverBody p={3}>
                    <HStack spacing={2} wrap="wrap" maxW="240px">
                      {['😊', '😂', '❤️', '👍', '🎉', '🔥', '😎', '🤔', '😢', '😡', '👋', '💪', '🎯', '⭐', '💯', '🚀', '🌈', '✨', '🎨', '🎭', '🎪', '🎲', '🎮', '🎸', '🎹', '🎺', '🎻', '🎼', '🎤', '🎧', '🎵'].map((emoji) => (
                        <Button
                          key={emoji}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEmojiSelect(emoji)}
                          fontSize="lg"
                          p={1}
                          minW="auto"
                          _hover={{ bg: 'rgba(0,0,0,0.1)' }}
                          borderRadius="md"
                        >
                          {emoji}
                        </Button>
                      ))}
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Input
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message..."
                size="lg"
                bg={useColorModeValue('rgba(255,255,255,0.9)', 'rgba(45,55,72,0.9)')}
                color={useColorModeValue('gray.800', 'white')}
                borderRadius="full"
                boxShadow="0 2px 10px rgba(0,0,0,0.1)"
                border="1px solid rgba(255,255,255,0.3)"
                _focus={{
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                  borderColor: 'purple.400',
                }}
                _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
              />
              <IconButton
                colorScheme="purple"
                aria-label="Send message"
                icon={<ArrowForwardIcon />}
                type="submit"
                size="lg"
                borderRadius="full"
                bgGradient="linear(to-r, purple.400, pink.400)"
                _hover={{
                  bgGradient: 'linear(to-r, purple.500, pink.500)',
                  transform: 'scale(1.05)',
                }}
                boxShadow="0 4px 15px rgba(128, 90, 213, 0.4)"
                transition="all 0.2s"
              />
            </HStack>
          </form>
        </Box>
      </Flex>

      {/* Mobile UserList at bottom */}
      <Box display={{ base: 'block', md: 'none' }} w="100%" boxShadow="md" position="relative" zIndex="1">
        <UserList users={users} typingUsers={typingUsers} />
      </Box>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .typing-dots span {
          animation: typing 1.4s infinite ease-in-out;
          display: inline-block;
          margin: 0 1px;
        }
        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>
    </Flex>
  );
};