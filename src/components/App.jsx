import { useEffect, useState, useRef } from "react";
import Header from "./Header.jsx";
import PlayersInfo from "./PlayersInfo.jsx";
import DisplayTexts from "./DisplayText.jsx";
import PowerUps from "./PowerUps.jsx";
import { useGameStore } from "../store/useGameStore.jsx";
import "../App.scss";

function App() {
  const { freezeInput } = useGameStore();
  // const [userInput, setUserInput] = useState("");
  // const [inputArray, setInputArray] = useState([]);
  // const [cursorPosition, setCursorPosition] = useState(0);
  // const [inputLocked, setInputLocked] = useState(false);
  // const wordsArray = wordCount(sampleText);
  // const inputLockedRef = useRef(false);
  // const inputRef = useRef(null);
  // const divRef = useRef(null);

  // let blurTimeout;

  // const freezeInput = () => {
  //   setInputLocked(true);
  //   inputLockedRef.current = true;
  //   setTimeout(() => {
  //     setInputLocked(false);
  //     inputLockedRef.current = false;
  //     console.log("Input Unfreezed.");
  //   }, 2000);
  // };

  // const handleText = (event) => {
  //   console.log(event);
  //   let input = event;
  //   if (!inputLockedRef.current) {
  //     setUserInput((prev) => {
  //       switch (true) {
  //         case input.key === "Backspace":
  //           return prev.slice(0, -1);
  //         case input.key === "1":
  //           console.log("Power Up 1 Fired");
  //           freezeInput();
  //           return prev;
  //         case input.key === "2":
  //           console.log("Power Up 2 Fired");
  //           return prev;
  //         case input.key === "3":
  //           console.log("Power Up 3 Fired");
  //           return prev;
  //         case input.code === "Space":
  //           return prev + " ";
  //         case input.code.slice(0, 3) !== "Key":
  //           return prev;
  //         case /^[A-Za-z\s]+$/.test(input.key):
  //           // console.log(/^[A-Za-z\s]+$/.test(input));
  //           return (prev + input.key).replace(/\s+/g, " ");

  //         default:
  //           return prev;
  //       }
  //     });
  //     setCursorPosition(userInput.length);
  //   }
  // };

  // useEffect(() => {
  //   const handleFocus = () => {
  //     console.log("Focused");
  //     clearTimeout(blurTimeout);
  //     divRef.current.classList.remove("blur");
  //     document.getElementById("outOfFocus").classList.remove("hidden");
  //     inputRef.current.addEventListener("keydown", handleText);
  //   };

  //   const handleBlur = () => {
  //     console.log("Blurred");
  //     blurTimeout = setTimeout(() => {
  //       divRef.current.classList.add("blur");
  //       document.getElementById("outOfFocus").classList.add("hidden");
  //     }, 1000);
  //     inputRef.current.removeEventListener("keydown", handleText);
  //   };

  //   const input = inputRef.current;

  //   input.addEventListener("focus", handleFocus);
  //   input.addEventListener("blur", handleBlur);
  //   //adding timeout cuz when you refresh the page the event listener is added after the focus event
  //   setTimeout(() => {
  //     input.focus();
  //   }, 0);

  //   // Cleanup listeners on component unmount
  //   return () => {
  //     input.removeEventListener("focus", handleFocus);
  //     input.removeEventListener("blur", handleBlur);
  //     input.removeEventListener("keydown", handleText);
  //   };
  // }, []);

  // useEffect(() => {
  //   setInputArray(wordCount(userInput));
  //   console.log("inputLocked state changed:", inputLocked);
  // }, [userInput]);

  return (
    <>
      <Header />
      <PlayersInfo />
      <DisplayTexts />
      <PowerUps />
      {/* <div className="textArea" tabIndex="0" ref={inputRef}>
        <div
          className="outOfFocus"
          id="outOfFocus"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.5rem",
            filter: "none",
            backdropFilter: "blur(0)",
          }}
        >
          <i className="fa-regular fa-hand-pointer"></i>Click Here To Focus
        </div>

        <div
          className="displayText"
          ref={divRef}
          style={{ backgroundColor: inputLocked ? "lightblue" : "transparent" }}
        >
          {wordsArray.map((word, wordIndex) => {
            return (
              <div
                className={
                  inputArray.length - 1 === wordIndex ? "word active" : "word"
                }
                key={wordIndex}
              >
                {word.split("").map((letter, index) => {
                  let className = "letter";
                  if (
                    inputArray[wordIndex] &&
                    inputArray[wordIndex][index] !== undefined
                  ) {
                    className +=
                      letter === inputArray[wordIndex][index]
                        ? " correct"
                        : " wrong";
                  }
                  return (
                    <span key={index} className={className}>
                      {letter}
                    </span>
                  );
                })}
                {inputArray[wordIndex] &&
                  inputArray[wordIndex].length > word.length &&
                  // inputArray[wordIndex].length - word.length < 7 &&
                  inputArray[wordIndex]
                    .slice(word.length)
                    .split("")
                    .map((extraLetter, index) => (
                      <span key={index} className="letter wrong extra">
                        {extraLetter}
                      </span>
                    ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="powerUps-container">
        <button id="powerUpButton" className="powerUp One">
          Freeze 1
        </button>
        <button className="powerUp Two">Bomb 2</button>
        <button className="powerUp Three">Shield 3</button>
      </div> */}
    </>
  );
}

export default App;
