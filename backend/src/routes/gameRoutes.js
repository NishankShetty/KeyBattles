const rooms = new Map();

function setupGameRoutes(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ roomId, username, isHost }) => {
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          players: [],
          isGameStarted: false,
        });
      }

      const room = rooms.get(roomId);
      const player = {
        socketId: socket.id,
        username,
        isHost,
        progress: 0,
        correctCount: 0,
        wrongCount: 0,
      };

      room.players.push(player);
      io.to(roomId).emit("playerJoined", room.players);

      socket.on("disconnect", () => {
        const room = rooms.get(roomId);
        if (room) {
          room.players = room.players.filter((p) => p.socketId !== socket.id);
          if (room.players.length === 0) {
            rooms.delete(roomId);
          } else {
            io.to(roomId).emit("playerLeft", room.players);
          }
        }
      });
    });

    socket.on(
      "updateProgress",
      ({ roomId, username, progress, correctCount, wrongCount }) => {
        const room = rooms.get(roomId);
        if (room) {
          const player = room.players.find((p) => p.username === username);
          if (player) {
            player.progress = progress;
            player.correctCount = correctCount;
            player.wrongCount = wrongCount;
            io.to(roomId).emit("playerProgress", {
              username,
              progress,
              correctCount,
              wrongCount,
            });
          }
        }
      }
    );
  });
}

module.exports = setupGameRoutes;
