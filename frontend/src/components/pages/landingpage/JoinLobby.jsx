import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../../store/useRoomStore";

function JoinLobby() {
  const [formData, setFormData] = useState({
    username: "",
    roomId: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initializeGame = useRoomStore((state) => state.initializeGame);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/rooms/${formData.roomId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Room not found");
      }

      // Initialize socket connection and join room
      initializeGame(formData.roomId, formData.username);

      // Navigate to game room
      navigate(`/game/${formData.roomId}`, {
        state: { username: formData.username },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="lobby-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={15}
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomId">Room ID</label>
        <input
          type="text"
          id="roomId"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
          minLength={7}
          maxLength={7}
        />
      </div>
      <button type="submit">Join Lobby</button>
    </form>
  );
}

export default JoinLobby;
