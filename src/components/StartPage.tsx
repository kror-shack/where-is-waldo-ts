import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../Firebase";
import "../styles/StartPage.scss";

interface User {
  userName: string;
  timeTaken: number;
}

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const StartPage = ({ user, setUser }: Props) => {
  const [startGame, setStartGame] = useState(false);
  const [userNameWarning, setUserNameWarning] = useState(false);
  const startGameLink = useRef<HTMLAnchorElement>(null!);
  const leaderBoardLink = useRef<HTMLAnchorElement>(null!);

  function handleInputChange(e: { target: HTMLInputElement }): void {
    setUser({
      ...user,
      userName: e.target?.value,
    });
  }

  function handleCLick(e: React.MouseEvent): void {
    e.preventDefault();
    const ref = collection(firestore, "leaderBoard"); // Firebase creates this automatically
    const q = query(ref, where("userName", "==", user.userName));
    getDocs(q)
      .then((doc) => {
        if (!(doc.docs.length === 0)) {
          setUserNameWarning(true);
        } else {
          setStartGame((prev) => !prev);
          setUserNameWarning(false);

          startGameLink.current.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLeaderBoardClick() {
    leaderBoardLink.current.click();
  }

  return (
    <div className="Start-page">
      <div className="header">
        <div className="heading">
          <h1>Where i</h1>
          <h1>s Waldo</h1>
        </div>
      </div>
      <div>
        <form>
          <img src={require("../assests/waldo-bg.jpeg")} alt=""></img>
          <div className="form-container">
            <label className="label" htmlFor="user-name">
              Enter Your Name
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              id="user-name"
              type="text"
              value={user.userName}
            />
            <p>{userNameWarning ? "Username is taken" : ""}</p>
            <button
              className="start-game-button"
              onClick={(e) => handleCLick(e)}
            >
              <Link
                ref={startGameLink}
                id="link-startGame"
                to={startGame ? "/Game-page" : ""}
              >
                Start Game
              </Link>
            </button>
          </div>
        </form>
      </div>
      <div className="leader-board-container">
        <div className="leader-board">
          <h2>Are you a Waldo expert?</h2>
          <h2>View the leaderBoard</h2>
          <button
            onClick={() => handleLeaderBoardClick()}
            className="leader-board-button"
          >
            <Link ref={leaderBoardLink} id="link-leaderboard" to="/leaderboard">
              {" "}
              View LeaderBoard
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
