import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../Firebase";
import "../styles/Timer.scss";

interface User {
  userName: string;
  timeTaken: number;
}

interface Props {
  gameOver: boolean;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Timer = ({ gameOver, user, setUser }: Props) => {
  const [displayTimer, setDisplayTimer] = useState<string | number>(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameOver) return;

    let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    let timerInterval = setInterval(displayTimer, 10);

    function displayTimer() {
      milliseconds += 10;
      if (milliseconds === 1000) {
        setTimer((prev) => (prev += 60));
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;

          minutes++;
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
        }
      }
      let h = hours < 10 ? "0" + hours : hours;
      let m = minutes < 10 ? "0" + minutes : minutes;
      let s = seconds < 10 ? "0" + seconds : seconds;
      let ms =
        milliseconds < 10
          ? "00" + milliseconds
          : milliseconds < 100
          ? "0" + milliseconds
          : milliseconds;

      setDisplayTimer(` ${h} : ${m} : ${s}`);
    }

    return () => {
      clearInterval(timerInterval);
    };
    // return clearInterval(timerInterval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver && user.timeTaken !== timer) {
      setUser({
        ...user,
        timeTaken: timer,
      });
      const ref = collection(firestore, "leaderBoard");

      addDoc(ref, {
        userName: user.userName,
        timeTaken: timer,
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gameOver, setUser, timer, user]);

  return (
    <div className="Timer">
      <div className="display">
        {gameOver ? <p>End Time:</p> : <p>Timer:</p>}
        {displayTimer}
      </div>
      {/* {gameOver? (<p>Timer:</p>{displayTimer}) : <p>End Time:</p> {displayTimer}} */}
    </div>
  );
};

export default Timer;
