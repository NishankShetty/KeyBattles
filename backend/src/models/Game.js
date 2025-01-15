import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    players: [
      {
        userId: String,
        username: String,
        progress: {
          type: Number,
          default: 0,
        },
      },
    ],
    status: {
      type: String,
      enum: ["waiting", "active", "completed"],
      default: "waiting",
    },
    text: {
      type: String,
      required: true,
    },
    startTime: Date,
    endTime: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
