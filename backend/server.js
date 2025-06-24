const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://real-time-chat-application-assignme.vercel.app"
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users and messages
const users = new Map();
const messages = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle user login
  socket.on('login', (username) => {
    users.set(socket.id, { username, id: socket.id });
    io.emit('userList', Array.from(users.values()));
    socket.emit('previousMessages', messages);
  });

  // Handle new message
  socket.on('message', (message) => {
    const user = users.get(socket.id);
    if (user) {
      const messageData = {
        id: Date.now(),
        text: message,
        user: user.username,
        timestamp: new Date().toISOString()
      };
      messages.push(messageData);
      io.emit('message', messageData);
    }
  });

  // Handle typing status
  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('userTyping', {
        user: user.username,
        isTyping
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    users.delete(socket.id);
    io.emit('userList', Array.from(users.values()));
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 