import React, { useState } from "react";
import uniqid from "uniqid";
import GamePage from "./components/GamePage";
import StartPage from "./components/StartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";

interface User {
  userName: string;
  timeTaken: number;
}

function App() {
  const [user, setUser] = useState<User>({
    userName: `Guest-User#${uniqid()}`,
    timeTaken: 0,
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<StartPage user={user} setUser={setUser} />}
          />
          <Route
            path="/game-page"
            element={<GamePage user={user} setUser={setUser} />}
          />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
