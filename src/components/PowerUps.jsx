import React from "react";
import { useGameStore } from "../store/useGameStore";

function PowerUps() {
  const { freezeInput } = useGameStore();

  return (
    <div className="powerUps-container">
      <button className="powerUp One" onClick={freezeInput}>
        Freeze 1
      </button>
      <button className="powerUp Two">Bomb 2</button>
      <button className="powerUp Three">Shield 3</button>
    </div>
  );
}

export default PowerUps;
