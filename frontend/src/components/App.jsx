// import { useEffect, useState, useRef } from "react";
// import Header from "./Header.jsx";
// import PlayersInfo from "./PlayersInfo.jsx";
// import DisplayTexts from "./DisplayText.jsx";
// import PowerUps from "./PowerUps.jsx";
// import { useRoomStore } from "../store/useRoomStore.jsx";
// import "../App.scss";

// function App() {
//   const { joinRoom, updateProgress, initializeSocketListeners } =
//     useRoomStore();
//   useEffect(() => {
//     initializeSocketListeners();
//     joinRoom("game123");
//   }, []);

//   const handleProgress = (newProgress) => {
//     updateProgress(newProgress);
//   };

//   return (
//     <>
//       <Header />
//       <PlayersInfo />
//       <DisplayTexts />
//       <PowerUps />
//     </>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import Game from "./pages/gameRoom/Game"; // Rename your current App content to Game
import "../App.scss";
import "./pages/landingpage/Landing.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//Frontend Comment for commit
