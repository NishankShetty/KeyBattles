import { useEffect, useState, useRef } from "react";
import Header from "./Header.jsx";
import PlayersInfo from "./PlayersInfo.jsx";
import DisplayTexts from "./DisplayText.jsx";
import PowerUps from "./PowerUps.jsx";
import { useRoomStore } from "../../../store/useRoomStore.jsx";
import "../../../App.scss";

function Game() {
  const { joinRoom, updateProgress, initializeSocketListeners } =
    useRoomStore();
  useEffect(() => {
    initializeSocketListeners();
    joinRoom("game123");
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
