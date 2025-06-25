import React from 'react';
import { Box, Text, VStack, HStack, Avatar, useColorModeValue } from '@chakra-ui/react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  // Generate avatar URL based on username
  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(message.user)}`;
  
  const ownMessageBg = useColorModeValue(
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  );
  const otherMessageBg = useColorModeValue(
    'rgba(255, 255, 255, 0.9)',
    'rgba(45, 55, 72, 0.9)'
  );
  const ownMessageColor = 'white';
  const otherMessageColor = useColorModeValue('gray.800', 'white');
  const timeColor = useColorModeValue('rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)');
  const otherTimeColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <HStack
      alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
      maxW="80%"
      spacing={3}
      mb={3}
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
    >
      <Avatar 
        size="sm" 
        src={avatarUrl} 
        name={message.user}
        ring="2px"
        ringColor={isOwnMessage ? 'purple.300' : 'gray.300'}
      />
      <Box
        bg={isOwnMessage ? ownMessageBg : otherMessageBg}
        color={isOwnMessage ? ownMessageColor : otherMessageColor}
        px={4}
        py={3}
        borderRadius={isOwnMessage ? '20px 20px 4px 20px' : '20px 20px 20px 4px'}
        boxShadow="0 4px 15px rgba(0,0,0,0.1)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255,255,255,0.1)"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          background: isOwnMessage 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          zIndex: -1,
        }}
      >
        <VStack align={isOwnMessage ? 'flex-end' : 'flex-start'} spacing={1}>
          {!isOwnMessage && (
            <Text 
              fontSize="sm" 
              fontWeight="bold" 
              color={isOwnMessage ? 'white' : 'purple.400'}
              textShadow={isOwnMessage ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'}
            >
              {message.user}
            </Text>
          )}
          <Text 
            fontSize="md" 
            lineHeight="1.4"
            textShadow={isOwnMessage ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'}
          >
            {message.text}
          </Text>
          <Text 
            fontSize="xs" 
            color={isOwnMessage ? timeColor : otherTimeColor}
            opacity={0.8}
          >
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
}; 