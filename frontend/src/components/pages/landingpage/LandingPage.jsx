import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateLobby from "./CreateLobby";
import JoinLobby from "./JoinLobby";
import "./Landing.scss";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: "20px 0" }}>
      {value === index && children}
    </div>
  );
}

function LandingPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav>
          <a href="#how-to-play">How to Play</a>
          <a href="#play-now">Play Now</a>
        </nav>
      </header>

      <main>
        <h1>KeyRacer</h1>
        <p>Challenge your friends in this multiplayer typing race!</p>

        <Box sx={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ marginBottom: 2 }}
          >
            <Tab label="Create New Lobby" />
            <Tab label="Join a Lobby" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <CreateLobby />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <JoinLobby />
          </TabPanel>
        </Box>
      </main>
    </div>
  );
}

export default LandingPage;
