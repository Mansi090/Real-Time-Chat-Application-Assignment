# Real-Time Chat Application

A modern real-time chat application built with the MERN stack (Node.js, Express, React) and integrated with Socket.IO for live messaging. This project features a beautiful, responsive UI created with Chakra UI.

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using WebSockets.
- **User Presence**: See who's online with a dedicated user list.
- **Typing Indicators**: Know when someone is typing a message.
- **Emoji Picker**: Add expression to your messages with a built-in emoji selector.
- **Avatars**: Unique, auto-generated avatars for each user.
- **Dark/Light Mode**: A toggle to switch between themes.
- **Responsive Design**: A seamless experience on both desktop and mobile devices.
- **Modern UI**: A clean, aesthetic, and user-friendly interface.

## 🚀 Live Demo

You can test the deployed application here: (https://real-time-chat-application-assignme.vercel.app/)

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Chakra UI
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.IO
- **Deployment**: Vercel (Frontend), Render (Backend)

## 📦 Project Structure

```
chatbot/
├── backend/        # Node.js, Express & Socket.IO Server
└── frontend/       # React & Chakra UI Application
```

## ⚙️ Setup and Running Locally

### Prerequisites

- Node.js (v14 or higher)
- npm (or yarn)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running at `http://localhost:5000`.

### Frontend Setup

1.  **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## 🌐 Deployment

This application is deployed using a split-service approach:

-   The **React Frontend** is hosted on **Vercel**.
-   The **Node.js Backend** is hosted on **Render**.

Any push to the `main` branch on GitHub will trigger an automatic redeployment for both services.

---

Built with ❤️. Enjoy chatting! 
