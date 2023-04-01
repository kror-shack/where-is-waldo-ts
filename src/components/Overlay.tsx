import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { firestore } from "../Firebase";

interface Props {
  waldoFoundState: boolean;
  wizardFoundState: boolean;
  odlawFoundState: boolean;
  setWaldoFoundState: React.Dispatch<React.SetStateAction<boolean>>;
  setOdlawFoundState: React.Dispatch<React.SetStateAction<boolean>>;
  setWizardFoundState: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = ({
  waldoFoundState,
  wizardFoundState,
  odlawFoundState,
  setWaldoFoundState,
  setOdlawFoundState,
  setWizardFoundState,
  setGameOver,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);

  const [mouseX, setMouseX] = useState(0);
  const [selectedDiv, setSelectedDiv] = useState<number | undefined>();
  const [mouseY, setMouseY] = useState(0);

  function handleImageClick(event: React.MouseEvent) {
    setShowPopup(true);
    console.log("the image is being clicked");
    let mousePos: { x: number | undefined; y: number | undefined } = {
      x: undefined,
      y: undefined,
    };
    setMouseX(event.clientX - 130);
    setMouseY(event.clientY - 130);
    mousePos = { x: event.clientX, y: event.clientY };
    console.log(mousePos);
  }

  const makeOverlayArray = () => {
    let array = [];
    for (let i = 1; i < 1501; i++) {
      array.push({
        value: i,
        key: uniqid(),
      });
    }
    return array;
  };
  const [array] = useState(makeOverlayArray());

  function handleCardClick(cardValue: number) {
    setSelectedDiv(cardValue);
  }

  function handleButtonClick(e: React.MouseEvent) {
    if (e.target instanceof HTMLElement) {
      let name = e.target.closest("button")!.textContent;
      checkForChar(selectedDiv!, name!);
      setShowPopup(false);
    }
  }

  function checkForChar(value: number, name: string) {
    const docRef = collection(firestore, "char-position");
    const q = query(docRef, where("Name", "==", name));

    getDocs(q)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let location = [...doc.data().Location];
          for (let i = 0; i < location.length; i++) {
            if (location[i] === value) {
              if (name === "Waldo") setWaldoFoundState((prev) => !prev);
              else if (name === "Odlaw") setOdlawFoundState((prev) => !prev);
              else if (name === "Wizard") {
                setWizardFoundState((prev) => !prev);
              }
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (waldoFoundState && odlawFoundState && wizardFoundState) {
      setGameOver((prev) => !prev);
    }
  }, [waldoFoundState, odlawFoundState, wizardFoundState]);

  return (
    <div>
      <div onClick={(e) => handleImageClick(e)} className="overlay">
        {array.map((card) => {
          return (
            <div
              key={card.key}
              onClick={() => handleCardClick(card.value)}
            ></div>
          );
        })}
      </div>
      <div
        style={{
          top: `${mouseY + window.scrollY}px`,
          left: `${mouseX + window.scrollX}px`,
          display: showPopup ? "" : "none",
        }}
        className={showPopup ? "popup-container" : ""}
      >
        <div className="popup">
          <div className="popup-circle"></div>
          <div className="popup-list">
            <button
              onClick={(e) => handleButtonClick(e)}
              style={{ display: waldoFoundState ? "none" : "flex" }}
            >
              <img src={require("../assests/waldo.png")} alt="" />
              Waldo
            </button>
            <button
              onClick={(e) => handleButtonClick(e)}
              style={{ display: odlawFoundState ? "none" : "flex" }}
            >
              <img src={require("../assests/odlaw.jpg")} alt="" />
              Odlaw
            </button>
            <button
              onClick={(e) => handleButtonClick(e)}
              style={{ display: wizardFoundState ? "none" : "flex" }}
            >
              <img src={require("../assests/wizard.jpg")} alt="" />
              Wizard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overlay;
