import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

const sampleText =
  "examples of simple sentences include the following joe waited for the train was late mary and samantha took the bus";

const wordCount = (sentence) => {
  return sentence.split(" ");
};

function App() {
  const [userInput, setUserInput] = useState("");
  const [inputArray, setInputArray] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const wordsArray = wordCount(sampleText);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const playersInfo = [
    { userName: "Nishank", userId: 1001, progress: 75 },
    { userName: "Adam", userId: 1002, progress: 50 },
    { userName: "Charlie", userId: 1003, progress: 25 },
    { userName: "Danny", userId: 1004, progress: 90 },
  ];

  const handleText = (event) => {
    // let input = event.target.value;
    console.log(event);
    let input = event;
    // only alphabets,space , ctrl c,v,x,a block
    // add previous and current input to userInput state
    // input = input.replace(/\s+/g, " "); //move this inside the setUserInput
    setUserInput((prev) => {
      switch (true) {
        case input.key === "Backspace":
          return prev.slice(0, -1);
        case input.key === "1":
          console.log("Power Up 1 Fired");
          return prev;
        case input.key === "2":
          console.log("Power Up 2 Fired");
          return prev;
        case input.key === "3":
          console.log("Power Up 3 Fired");
          return prev;
        case input.code === "Space":
          return prev + " ";
        case input.code.slice(0, 3) !== "Key":
          return prev;
        case /^[A-Za-z\s]+$/.test(input.key):
          console.log(/^[A-Za-z\s]+$/.test(input));
          console.log(input);
          return (prev + input.key).replace(/\s+/g, " ");

        default:
          return prev;
      }
    });

    setCursorPosition(userInput.length);
  };

  useEffect(() => {
    const handleFocus = () => {
      console.log("Focused");
      divRef.current.classList.remove("blur");
      document.getElementById("outOfFocus").classList.add("hidden");
      inputRef.current.addEventListener("keydown", handleText);
    };

    const handleBlur = () => {
      console.log("Blurred");
      setTimeout(() => {
        divRef.current.classList.add("blur");
        document.getElementById("outOfFocus").classList.remove("hidden");
      }, 1000);
      inputRef.current.removeEventListener("keydown", handleText);
    };

    const input = inputRef.current;

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
    //adding timeout cuz when you refresh the page the event listener is added after the focus event
    setTimeout(() => {
      input.focus();
    }, 0);

    // Cleanup listeners on component unmount
    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
      input.removeEventListener("keydown", handleText);
    };
  }, []);

  useEffect(() => {
    setInputArray(wordCount(userInput));
  }, [userInput]);

  return (
    <>
      <h2>KeyRacer</h2>

      <div className="PlayersInfo">
        <h3>Players</h3>
        {playersInfo.map((player, index) => (
          <span className={"Player " + (index + 1)} key={index}>
            <div className="userName-container">
              <div className="userName">{player.userName}</div>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${player.progress}%` }}
              ></div>
            </div>
            <div className="statistics-container">Stats</div>
          </span>
        ))}
      </div>
      <div className="textArea" tabIndex="0" ref={inputRef}>
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

        <div className="displayText" ref={divRef}>
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
          Power 1
        </button>
        <button className="powerUp Two">Power 2</button>
        <button className="powerUp Three">Power 3</button>
      </div>
    </>
  );
}

export default App;
