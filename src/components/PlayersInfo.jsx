import React from "react";

const playersInfo = [
  { userName: "Nishank", userId: 1001, progress: 75 },
  { userName: "Adam", userId: 1002, progress: 50 },
  { userName: "Charlie", userId: 1003, progress: 25 },
  { userName: "Danny", userId: 1004, progress: 90 },
];

export default function PlayersInfo() {
  return (
    <div className="PlayersInfo">
      <h3>Players</h3>
      {playersInfo.map((player, index) => (
        <span className={"Player " + (index + 1)} key={index}>
          <div className="userName-container">
            <div className="userName">{player.userName}</div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${player.progress}%` }}
            ></div>
          </div>
          <div className="statistics-container">Stats</div>
        </span>
      ))}
    </div>
  );
}
