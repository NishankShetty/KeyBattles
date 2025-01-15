import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateLobby() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Create lobby API call
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/game/${roomId}`, { state: { username } });
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
        />
      </div>
      <button type="submit">Create Lobby</button>
    </form>
  );
}

export default CreateLobby;
