import React, { useState, useEffect, useRef } from "react";
import "../styles/GamePage.scss";
import Overlay from "./Overlay";
import { Link } from "react-router-dom";
import Timer from "./Timer";

interface User {
  userName: string;
  timeTaken: number;
}

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const GamePage = ({ user, setUser }: Props) => {
  const [waldoFoundState, setWaldoFoundState] = useState(false);
  const [odlawFoundState, setOdlawFoundState] = useState(false);
  const [wizardFoundState, setWizardFoundState] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const leaderBoardLink = useRef<HTMLAnchorElement>(null!);
  const homeLink = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    console.log("the component has mounted");
  }, []);

  function handleHomeButtonClick() {
    homeLink.current.click();
  }

  function handleLeaderBoardClick() {
    leaderBoardLink.current.click();
  }

  return (
    <div className="Game-page">
      <div className="header">
        <div className="header-left">
          <div style={{ opacity: waldoFoundState ? "0.4" : "1" }}>
            <img src={require("../assests/waldo.png")} alt="" />
            <p>Waldo</p>
          </div>
          <div style={{ opacity: odlawFoundState ? "0.4" : "1" }}>
            <img src={require("../assests/odlaw.jpg")} alt="" />
            <p>Odlaw</p>
          </div>
          <div style={{ opacity: wizardFoundState ? "0.4" : "1" }}>
            <img src={require("../assests/wizard.jpg")} alt="" />
            <p>Wizard</p>
          </div>
        </div>
        <Timer gameOver={gameOver} user={user} setUser={setUser} />

        <div className="header-right">
          <button
            className="home-button"
            onClick={() => handleHomeButtonClick()}
          >
            <Link ref={homeLink} to="/">
              HOME
            </Link>
          </button>
        </div>
      </div>
      <div className="body">
        <div>
          <img
            src={require("../assests/main-game-display-picture.jpg")}
            alt=""
          />
        </div>

        <div>
          <Overlay
            waldoFoundState={waldoFoundState}
            wizardFoundState={wizardFoundState}
            odlawFoundState={odlawFoundState}
            setWaldoFoundState={setWaldoFoundState}
            setOdlawFoundState={setOdlawFoundState}
            setWizardFoundState={setWizardFoundState}
            setGameOver={setGameOver}
          />
        </div>
      </div>
      <div className={gameOver ? "game-over" : "hide"}>
        <p>Game Over</p>
        <div className="button-container">
          <button
            className="home-button"
            onClick={() => handleHomeButtonClick()}
          >
            <Link id="link-Home" to="/">
              HOME
            </Link>
          </button>
          <button
            onClick={() => handleLeaderBoardClick()}
            className="leader-board-button"
          >
            <Link ref={leaderBoardLink} id="link-Leaderboard" to="/leaderboard">
              {" "}
              LeaderBoard
            </Link>
          </button>
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default GamePage;
