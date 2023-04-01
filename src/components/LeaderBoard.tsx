import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { firestore } from "../Firebase";
import "../styles/Leaderboard.scss";
import { Link } from "react-router-dom";

interface User {
  userName: string;
  timeTaken: number;
}

interface UserData extends Partial<User> {
  id: string;
}

const LeaderBoard = () => {
  const [scoreBoard, setScoreBoard] = useState<UserData[]>();
  const homeLink = useRef<HTMLAnchorElement>(null!);

  function getLeaderBoard() {
    let books: UserData[] = [];
    const ref = collection(firestore, "leaderBoard");
    const q = query(
      ref,
      where("timeTaken", ">", 0),
      orderBy("timeTaken", "asc")
    );
    getDocs(q)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setScoreBoard(books);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getLeaderBoard();
  }, []);

  function handleHomeClick() {
    homeLink.current.click();
  }

  return (
    <div className="LeaderBoard">
      <div className="header-container">
        <div className="header">
          <h1>Leader</h1>
          <h1>Board</h1>
        </div>
        <div>
          <button onClick={() => handleHomeClick()}>
            <Link ref={homeLink} id="link-home" to="/">
              HOME
            </Link>
          </button>
        </div>
      </div>
      <div>
        <div className="table">
          <div className="header">
            <p>RANK</p>
            <p>NAME</p>
          </div>
          <div className="card-container">
            {scoreBoard ? (
              scoreBoard.map((card, i) => {
                return (
                  <div className="card" key={card.id}>
                    <p>No: {i + 1}</p>
                    <p>{card.userName}</p>
                  </div>
                );
              })
            ) : (
              <div className="loading">LOADING...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
