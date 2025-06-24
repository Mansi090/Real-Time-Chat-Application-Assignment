import React from 'react';
import { Box, VStack, Text, Badge, Avatar, HStack } from '@chakra-ui/react';
import { User, TypingStatus } from '../types';

interface UserListProps {
  users: User[];
  typingUsers: TypingStatus[];
}

export const UserList: React.FC<UserListProps> = ({ users, typingUsers }) => {
  return (
    <Box
      w={{ base: '100%', md: '260px' }}
      h="100%"
      borderLeftWidth={{ base: 0, md: 1 }}
      p={4}
      bgGradient="linear(to-b, blue.50, white)"
      overflowY="auto"
      boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb={6} color="blue.700">
        Online Users
      </Text>
      <VStack align="stretch" spacing={3}>
        {users.map((user) => {
          const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user.username)}`;
          const isTyping = typingUsers.some((typing) => typing.user === user.username);
          return (
            <HStack
              key={user.id}
              p={2}
              borderRadius="md"
              bg="gray.50"
              boxShadow="sm"
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack spacing={3} alignItems="center">
                <Avatar size="sm" src={avatarUrl} name={user.username} />
                <Text fontWeight="medium">{user.username}</Text>
                <Badge colorScheme="green" variant="solid" fontSize="0.7em">online</Badge>
              </HStack>
              {isTyping && (
                <Badge colorScheme="blue" variant="subtle">
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