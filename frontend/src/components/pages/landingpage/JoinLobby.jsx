import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinLobby() {
  const [formData, setFormData] = useState({
    username: "",
    roomId: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Join lobby API call
    navigate(`/game/${formData.roomId}`, {
      state: { username: formData.username },
    });
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
