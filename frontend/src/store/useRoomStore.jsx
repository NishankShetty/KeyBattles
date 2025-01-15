import { create } from "zustand";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export const useRoomStore = create((set) => ({
  socket: socket,
  progress: 0,
  roomId: null,

  joinRoom: (roomId) => {
    socket.emit("joinRoom", roomId);
    set({ roomId });
  },

  updateProgress: (progress) => {
    set({ progress });
    socket.emit("gameProgress", {
      roomId: useGameStore.getState().roomId,
      progress,
    });
  },

  // Listen for other players' progress
  initializeSocketListeners: () => {
    socket.on("playerProgress", (data) => {
      console.log(`Player ${data.playerId} progress: ${data.progress}`);
      // Update other player's progress in state
    });
  },
}));
