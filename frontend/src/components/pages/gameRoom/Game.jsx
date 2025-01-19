import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header.jsx";
import PlayersInfo from "./PlayersInfo.jsx";
import DisplayTexts from "./DisplayText.jsx";
import PowerUps from "./PowerUps.jsx";
import { useRoomStore } from "../../../store/useRoomStore.jsx";
import "../../../App.scss";

function Game() {
  const location = useLocation();
  const { roomId } = useParams();
  const { username, isHost } = location.state || {};
  const { initializeGame, cleanup, updateProgress } = useRoomStore();

  useEffect(() => {
    if (roomId && username) {
      // Initialize socket connection after component mount
      initializeGame(roomId, username, isHost);
    }

    return () => {
      cleanup();
    };
  }, []);

  const handleProgress = (newProgress) => {
    updateProgress(newProgress);
  };

  return (
    <>
      <Header />
      <PlayersInfo />
      <DisplayTexts />
      <PowerUps />
    </>
  );
}

export default Game;
