import Game from "../models/Game";

const gameController = {
  createGame: async (req, res) => {
    try {
      const { userId, username } = req.body;
      const game = new Game({
        roomId: Math.random().toString(36).substring(2, 8),
        players: [{ userId, username }],
        text: "Sample text for typing game", // You can add proper text generation later
      });
      await game.save();
      res.status(201).json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  joinGame: async (req, res) => {
    try {
      const { roomId, userId, username } = req.body;
      const game = await Game.findOne({ roomId });

      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }

      if (game.status !== "waiting") {
        return res.status(400).json({ error: "Game already started" });
      }

      game.players.push({ userId, username });
      await game.save();

      res.json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = gameController;
