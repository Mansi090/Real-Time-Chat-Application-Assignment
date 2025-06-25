import React, { useRef, useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Avatar, useColorModeValue, IconButton, Tooltip } from '@chakra-ui/react';
import { Message } from '../types';
import { AddIcon, RepeatIcon, ArrowDownIcon } from '@chakra-ui/icons';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  onReact?: (id: number, emoji: string) => void;
  onReply?: (id: number) => void;
  scrollToRef?: (id: number) => void;
  replyTo?: number;
  messages?: Message[];
  userJoinTime?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage, onReact, onReply, scrollToRef, replyTo, messages, userJoinTime }) => {
  // Generate avatar URL based on username
  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(message.user)}`;
  const messageRef = useRef<HTMLDivElement>(null);

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

  const [highlight, setHighlight] = useState(false);

  // Find the replied-to message
  let repliedMessage: Message | undefined = undefined;
  if (replyTo && messages) {
    repliedMessage = messages.find((m) => m.id === replyTo);
  }

  // Scroll to this message if requested
  React.useEffect(() => {
    if (scrollToRef && messageRef.current) {
      scrollToRef(message.id);
    }
  }, [scrollToRef, message.id]);

  // Highlight this message if the URL hash or location points to it (simulate scroll-to-reply)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === `#message-${message.id}`) {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1200);
      }
    };
    window.addEventListener('hashchange', handleHash);
    // Check on mount
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [message.id]);

  // Determine if this is a new message (after user joined)
  const isNew = userJoinTime ? new Date(message.timestamp) > new Date(userJoinTime) : false;

  return (
    <HStack
      ref={messageRef}
      alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
      maxW="80%"
      spacing={3}
      mb={3}
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
      id={`message-${message.id}`}
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
        style={highlight ? { background: 'linear-gradient(90deg, #fbb6ce 0%, #fbc2eb 100%)', transition: 'background 0.6s' } : {}}
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
        <VStack align={isOwnMessage ? 'flex-end' : 'flex-start'} spacing={1}>
          {/* WhatsApp-style reply preview */}
          {repliedMessage && (
            <Box mb={1} p={2} borderLeft="4px solid #d53f8c" bg="rgba(237,100,166,0.15)" borderRadius="md" w="100%" display="flex" alignItems="flex-start" justifyContent="space-between">
              <Box flex={1}>
                <Text fontSize="xs" color="#d53f8c" fontWeight="bold" display="block">{repliedMessage.user}</Text>
                <Text fontSize="sm" color="#2d3748" mt={1} whiteSpace="pre-wrap" display="block">{repliedMessage.text}</Text>
              </Box>
              <IconButton
                size="xs"
                ml={2}
                icon={<ArrowDownIcon />}
                aria-label="Go to original message"
                variant="ghost"
                onClick={() => {
                  window.location.hash = `#message-${repliedMessage?.id}`;
                  const el = document.getElementById(`message-${repliedMessage?.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              />
            </Box>
          )}
          <Text 
            fontSize="md" 
            lineHeight="1.4"
            textShadow={isOwnMessage ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'}
            whiteSpace="pre-line"
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
          {/* Reactions bar */}
          {message.reactions && message.reactions.length > 0 && (
            <HStack spacing={1} mt={1}>
              {message.reactions.map((reaction) => (
                <Box
                  key={reaction.emoji}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  bg="rgba(128,90,213,0.15)"
                  fontSize="lg"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(128,90,213,0.25)' }}
                  onClick={() => onReact && onReact(message.id, reaction.emoji)}
                >
                  {reaction.emoji} <span style={{ fontSize: '0.8em' }}>{reaction.users.length}</span>
                </Box>
              ))}
              {/* Add reaction button */}
              <Tooltip label="Add reaction">
                <span>
                  <IconButton
                    size="xs"
                    icon={<AddIcon />}
                    aria-label="Add reaction"
                    variant="ghost"
                    onClick={() => onReact && onReact(message.id, '👍')}
                  />
                </span>
              </Tooltip>
            </HStack>
          )}
          {/* Reply button */}
          <HStack spacing={1} mt={1}>
            <Tooltip label="Reply">
              <span>
                <IconButton
                  size="xs"
                  icon={<RepeatIcon />}
                  aria-label="Reply"
                  variant="ghost"
                  onClick={() => onReply && onReply(message.id)}
                />
              </span>
            </Tooltip>
          </HStack>
        </VStack>
      </Box>
    </HStack>
  );
};