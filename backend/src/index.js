const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const setupGameRoutes = require("./routes/gameRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
  },
});

// Set up socket routes
setupGameRoutes(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
