import React from 'react';
import { Box, VStack, Text, Badge, Avatar, HStack, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { User, TypingStatus } from '../types';

interface UserListProps {
  users: User[];
  typingUsers: TypingStatus[];
}

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const UserList: React.FC<UserListProps> = ({ users, typingUsers }) => {
  const bgGradient = useColorModeValue(
    'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.9) 100%)',
    'linear-gradient(135deg, rgba(26,32,44,0.9) 0%, rgba(45,55,72,0.9) 100%)'
  );
  const borderColor = useColorModeValue('rgba(102,126,234,0.2)', 'rgba(255,255,255,0.1)');
  const userCardBg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(45,55,72,0.8)');
  const onlineBadgeBg = useColorModeValue('green.400', 'green.300');
  const typingBadgeBg = useColorModeValue('purple.400', 'purple.300');

  return (
    <Box
      w={{ base: '100%', md: '280px' }}
      h="100%"
      borderLeftWidth={{ base: 0, md: 1 }}
      borderColor={borderColor}
      p={4}
      bg={bgGradient}
      backdropFilter="blur(20px)"
      overflowY="auto"
      boxShadow="0 4px 20px rgba(0,0,0,0.1)"
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(0,0,0,0.5)',
        },
      }}
    >
      <Text 
        fontSize="xl" 
        fontWeight="bold" 
        mb={6} 
        bgGradient="linear(to-r, purple.400, pink.400)"
        bgClip="text"
        textAlign="center"
      >
        👥 Online Users
      </Text>
      <VStack align="stretch" spacing={3}>
        {users.map((user) => {
          const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.username)}`;
          const isTyping = typingUsers.some((typing) => typing.user === user.username && typing.isTyping);
          return (
            <HStack
              key={user.id}
              p={3}
              borderRadius="xl"
              bg={userCardBg}
              backdropFilter="blur(10px)"
              boxShadow="0 2px 10px rgba(0,0,0,0.1)"
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
              border="1px solid rgba(255,255,255,0.2)"
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <HStack spacing={3} alignItems="center">
                <Avatar 
                  size="md" 
                  src={avatarUrl} 
                  name={user.username}
                  ring="2px"
                  ringColor={onlineBadgeBg}
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold" fontSize="sm">{user.username}</Text>
                  <Badge 
                    colorScheme="green" 
                    variant="solid" 
                    fontSize="0.6em"
                    bg={onlineBadgeBg}
                    borderRadius="full"
                    px={2}
                  >
                    online
                  </Badge>
                </VStack>
              </HStack>
              {isTyping && (
                <Badge 
                  colorScheme="purple" 
                  variant="solid"
                  bg={typingBadgeBg}
                  borderRadius="full"
                  px={2}
                  fontSize="0.6em"
                  animation={`${pulse} 1.5s infinite`}
                >
                  typing...
                </Badge>
              )}
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
};