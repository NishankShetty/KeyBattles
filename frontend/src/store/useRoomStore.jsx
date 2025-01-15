import { create } from "zustand";
import io from "socket.io-client";

export const useRoomStore = create((set, get) => ({
  socket: null,
  progress: 0,
  roomId: null,
  players: [],

  // Initialize socket and join room
  initializeGame: (roomId, username) => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", { roomId, username });
    });

    socket.on("playerJoined", (players) => {
      set({ players });
    });

    socket.on("playerLeft", (players) => {
      set({ players });
    });

    socket.on("playerProgress", (data) => {
      console.log(`Player ${data.username} progress: ${data.progress}`);
      // Update other player's progress in state
    });

    set({ socket, roomId });
  },

  // Cleanup socket connection
  cleanup: () => {
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
