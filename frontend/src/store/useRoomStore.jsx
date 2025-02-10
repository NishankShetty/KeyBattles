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
      console.log("socket.id:", socket.id);
      set({ socket: socket });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("playerJoined", (players) => {
      console.log("Player joined, updating players:", players);
      set({ players });
    });

    socket.on("playerLeft", (players) => {
      console.log("Player left, updating players:", players);
      set({ players });
    });
    // get other playerProgress from server
    socket.on("playerProgress", (data) => {
      const state = get();
      //data:{socketId:socketId,stats:{stats}}
      console.log(`PlayerProgress:${JSON.stringify(data)}`);
      //player:{username:username,socketId:socketId,isHost:isHost,stats:stats}
      const updatedPlayers = state.players.map((player) => {
        if (player.socketId == data.socketId) {
          return {
            username: player.username,
            socketId: player.socketId,
            isHost: player.isHost,
            stats: data.stats,
          };
        } else {
          return player;
        }
      });
      console.log("updatedPlayers:", JSON.stringify(updatedPlayers));
      set({ players: updatedPlayers });
    });

    set({ socket, roomId });
    console.log("Game initialized with socket:", socket.id);
  },

  // Update local progress to server and local progress to RoomStore
  updateProgress: (stats) => {
    const state = get();
    const data = {
      roomId: state.roomId,
      socketId: state.socket.id,
      stats: stats,
    };
    const updatedPlayers = state.players.map((player) => {
      if (player.socketId === state.socket.id) {
        return {
          username: player.username,
          socketId: player.socketId,
          isHost: player.isHost,
          stats: stats,
        };
      } else {
        return player;
      }
    });
    set({ players: updatedPlayers });
    state.socket.emit("gameProgress", data);
    // stats ={correct:0,incorrect:0,progress:0}
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
}));
