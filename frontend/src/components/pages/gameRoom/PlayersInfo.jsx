import React from "react";
import { useRoomStore } from "../../../store/useRoomStore";
import { useMetricsStore } from "../../../store/useMetricsStore";
import { useLocation } from "react-router-dom";

export default function PlayersInfo() {
  const { players } = useRoomStore();
  const { progress, accuracy } = useMetricsStore();
  const location = useLocation();
  const currentUsername = location.state?.username;

  // Sort players to put current user first
  const sortedPlayers = React.useMemo(() => {
    return [...players].sort((a, b) => {
      if (a.username === currentUsername) return -1;
      if (b.username === currentUsername) return 1;
      return 0;
    });
  }, [players, currentUsername]);
  console.log("sortedPlayers:", sortedPlayers);
  return (
    <div className="PlayersInfo">
      <h3>Players</h3>
      {sortedPlayers.map((player, index) => (
        <span
          className={`Player ${
            player.username === currentUsername ? "current-player" : ""
          }`}
          key={player.username}
        >
          <div className="userName-container">
            <div className="userName">
              {player.username}{" "}
              {player.username === currentUsername ? "( You )" : ""}
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${player.stats.progress || 0}%`,
              }}
            ></div>
          </div>
          <div className="statistics-container">
            Accuracy: {Math.ceil(player.stats.accuracy) || 0}%
          </div>
        </span>
      ))}
    </div>
  );
}
