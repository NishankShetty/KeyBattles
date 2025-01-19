import { create } from "zustand";
import io from "socket.io-client";

export const useRoomStore = create((set, get) => ({
  socket: null,
  progress: 0,
  roomId: null,
  players: [],

  // Initialize socket and join room
  initializeGame: (roomId, username, isHost) => {
    console.log("Initializing game...", { roomId, username });
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Socket connected successfully");
      socket.emit("joinRoom", { roomId, username, isHost: isHost });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected"); // Add this to track disconnections
    });

    socket.on("playerJoined", (players) => {
      console.log("Player joined, updating players:", players);
      set({ players });
    });

    socket.on("playerLeft", (players) => {
      console.log("Player left, updating players:", players);
      set({ players });
    });

    socket.on("playerProgress", (data) => {
      console.log(`Player ${data.username} progress: ${data.progress}`);
      // Update other player's progress in state
    });

    set({ socket, roomId });
    console.log("Game initialized with socket:", socket.id);
  },

  // Cleanup socket connection
  cleanup: () => {
    console.log("Cleaning up socket connection...");
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, roomId: null, progress: 0, players: [] });
    }
  },

  updateProgress: (progress) => {
    const { socket, roomId } = get();
    set({ progress });
    if (socket) {
      socket.emit("gameProgress", {
        roomId,
        progress,
      });
    }
  },
}));
