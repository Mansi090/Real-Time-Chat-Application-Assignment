export interface Message {
  id: number;
  text: string;
  user: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
}

export interface TypingStatus {
  user: string;
  isTyping: boolean;
} 