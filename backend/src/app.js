import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import "dotenv/config";
import generateWords from "./utils/generateTypingWords.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 60000,
  transports: ["websocket", "polling"],
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});
//get activeRoom details
const activeRooms = new Map();
app.get("/roomsinfo", (req, res) => {
  res.json({ activeRooms: Array.from(activeRooms.entries()) });
});
// Create room endpoint
app.post("/api/rooms", (req, res) => {
  try {
    const { username } = req.body;

    const roomId = Math.random().toString(36).substring(2, 8);

    // Store room data
    activeRooms.set(roomId, {
      players: [],
      status: "waiting",
      createdAt: Date.now(),
      text: generateWords(), //"Sample text for typing game", // You can add proper text generation later
    });
    let roomInfo = activeRooms.get(roomId);

    console.log(`Room created: ${roomId}`);
    res.status(201).json({ roomId, roomInfo });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Check room endpoint
app.get("/api/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = activeRooms.get(roomId);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  res.json(room);
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ roomId, username, isHost }) => {
    const room = activeRooms.get(roomId);

    if (room) {
      // Add player to room
      room.players.push({
        username: username,
        socketId: socket.id,
        isHost: isHost,
      });
      socket.join(roomId);

      // Notify all clients in room about new player
      io.to(roomId).emit("playerJoined", room.players);
      console.log(`User ${username} joined room ${roomId}`);
    }
  });

  socket.on("gameProgress", (data) => {
    const room = activeRooms.get(data.roomId);
    if (room) {
      socket.to(data.roomId).emit("playerProgress", {
        playerId: socket.id,
        username: data.username,
        progress: data.progress,
      });
    }
  });

  socket.on("disconnect", () => {
    // Remove player from any room they were in
    activeRooms.forEach((room, roomId) => {
      // console.log("room=", room);
      // console.log("roomId=", roomId);
      // console.log("room.players=", room.players);
      const playerIndex = room.players.findIndex(
        (p) => p.socketId === socket.id
      );
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);

        // If room is empty, remove it
        if (room.players.length === 0) {
          activeRooms.delete(roomId);
          console.log(`Room ${roomId} deleted - no players remaining`);
        } else {
          // Notify remaining players
          io.to(roomId).emit("playerLeft", room.players);
        }
      }
    });
    console.log("User disconnected:", socket.id);
    console.log(
      "Active Rooms:",
      JSON.stringify(Array.from(activeRooms.entries()), null, 2)
    );
  });
});

// Clean up inactive rooms every hour
setInterval(() => {
  const now = Date.now();
  activeRooms.forEach((room, roomId) => {
    if (now - room.createdAt > 24 * 60 * 60 * 1000) {
      // 24 hours
      activeRooms.delete(roomId);
      console.log(`Room ${roomId} deleted - expired`);
    }
  });
}, 60 * 60 * 1000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
