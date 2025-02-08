# KeyRacer - Multiplayer Typing Race Game

**Developed at Stevens Institute of Technology**

KeyRacer is a real-time multiplayer typing race game where players compete against each other to type text as quickly and accurately as possible. Built with React, Node.js, and Socket.IO for real-time gameplay.

## Features

- Real-time multiplayer typing races
- Create and join game rooms with custom lobby creation
- Live progress tracking
- Power-ups system
- Word accuracy tracking
- Clean, minimalist UI
- Responsive and user-friendly interface with Material-UI, ShadCn, and Framer Motion
- Efficient in-memory room management system with unique room IDs
- Complex state handling using Zustand for predictable data flow and real-time game progress tracking
- Event-driven architecture for real-time updates and improved scalability
- Asynchronous messaging and task queueing with RabbitMQ for scalability and concurrency

## Tech Stack

### Frontend
- React 18
- Vite
- Socket.IO Client
- Zustand (State Management)
- Material-UI
- SASS
- React Router DOM
- ShadCn
- Framer Motion

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB (prepared for future use)
- CORS
- RabbitMQ

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional, for future features)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/key-racer.git
   cd keyracer
   ```
2. Install Backend Dependencies
   ```bash
   cd backend
   npm install
   ```
3. Install Frontend Dependencies
   ```bash
   cd frontend
   npm install
   ```
Create a `.env` file in the backend directory:
4. Configure Environment Variables
   ```bash
   env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   RABBITMQ_URL=your_rabbitmq_url
   FRONTEND_URL=http://localhost:5173
   ```

## Running the Application

1. Start the Backend Server
   ```bash
   cd backend
   npm run dev
   ```
   
2. Start the Frontend Development Server
   ```bash
   cd frontend
   npm run dev
   ```
   
The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Game Rules

1. Create a new game room or join an existing one
2. Wait for other players to join
3. Type the displayed text as quickly and accurately as possible
4. Use power-ups strategically to gain advantages
5. First player to complete the text wins!

## Project Structure
```bash
keyracer/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── store/
│ │ └── assets/
│ ├── public/
│ └── package.json
└── backend/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── app.js
└── package.json
```

