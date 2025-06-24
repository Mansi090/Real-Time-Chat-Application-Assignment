import React from 'react';
import { Box, Text, VStack, HStack, Avatar } from '@chakra-ui/react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  // Generate avatar URL based on username
  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(message.user)}`;
  return (
    <HStack
      alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
      maxW="80%"
      spacing={3}
      mb={2}
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
    >
      <Avatar size="sm" src={avatarUrl} name={message.user} />
      <Box
        bg={isOwnMessage ? 'blue.500' : 'gray.100'}
        color={isOwnMessage ? 'white' : 'black'}
        px={4}
        py={2}
        borderRadius={isOwnMessage ? '20px 20px 4px 20px' : '20px 20px 20px 4px'}
        boxShadow="md"
      >
        <VStack align={isOwnMessage ? 'flex-end' : 'flex-start'} spacing={1}>
          {!isOwnMessage && (
            <Text fontSize="sm" fontWeight="bold" color={isOwnMessage ? 'white' : 'blue.200'}>
              {message.user}
            </Text>
          )}
          <Text fontSize="md">{message.text}</Text>
          <Text fontSize="xs" color={isOwnMessage ? 'whiteAlpha.700' : 'gray.500'}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
}; 