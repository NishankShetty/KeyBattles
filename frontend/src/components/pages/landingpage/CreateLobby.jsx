import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../../store/useRoomStore";

function CreateLobby() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initializeGame = useRoomStore((state) => state.initializeGame);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create lobby");
      }

      // Initialize socket connection and join room
      console.log("data", data);
      // Navigate to game room
      navigate(`/game/${data.roomId}`, {
        state: {
          username,
          isHost: true,
          roomId: data.roomId,
          words: data.roomInfo.text,
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lobby-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          maxLength={15}
          disabled={isLoading}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Lobby"}
      </button>
    </form>
  );
}

export default CreateLobby;
