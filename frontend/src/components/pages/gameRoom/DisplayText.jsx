import React, { useRef, useEffect } from "react";
import { useGameStore } from "../../../store/useGameStore.jsx";
import InsertionPoint from "./insertionPoint.jsx";
import { words } from "../../utils/typingwords.jsx";

const sampleText =
  "examples of simple sentences include the following joe waited for the train was late mary and samantha took the bus"; // You can pass this as a prop if dynamic.

function DisplayText() {
  const { userInput, inputArray, inputLocked, setUserInput, freezeInput } =
    useGameStore();
  console.log(inputArray);
  const userInputRef = useRef(userInput);
  const inputLockedRef = useRef(inputLocked);
  console.log("userInput from main():", userInput);
  const wordsArray = words; //sampleText.split(" "); //[];
  const inputRef = useRef(null);
  const divRef = useRef(null);
  let blurTimeout;

  useEffect(() => {
    userInputRef.current = userInput;
    inputLockedRef.current = inputLocked;
  }, [userInput, inputLocked]);

  const handleText = (event) => {
    console.log("event:", event);
    console.log("userInput from the handleText():", userInputRef.current);
    if (!inputLockedRef.current) {
      let input;
      switch (true) {
        case event.key === "Backspace":
          input = userInputRef.current.slice(0, -1);
          break;
        case event.key === "1":
          freezeInput();
          input = userInputRef.current;
          break;
        case event.code === "Space":
          input = (userInputRef.current + " ").replace(/\s+/g, " ");
          break;
        case event.code.slice(0, 3) !== "Key":
          input = userInputRef.current;
          break;
        case /^[A-Za-z\s]+$/.test(event.key):
          input = userInputRef.current + event.key;
          console.log("input:", input);
          break;
        default:
          input = userInputRef.current;
      }
      setUserInput(input);
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      clearTimeout(blurTimeout);
      divRef.current.classList.remove("blur");
      document.getElementById("outOfFocus").classList.remove("hidden");
      document.getElementById("insertion-point").classList.remove("invisible");
      inputRef.current.addEventListener("keydown", handleText);
    };

    const handleBlur = () => {
      blurTimeout = setTimeout(() => {
        divRef.current.classList.add("blur");
        document.getElementById("outOfFocus").classList.add("hidden");
        document.getElementById("insertion-point").classList.add("invisible");
      }, 1000);
      inputRef.current.removeEventListener("keydown", handleText);
    };

    const input = inputRef.current;
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
    input.blur();
    input.focus();

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
      input.removeEventListener("keydown", handleText);
    };
  }, []);

  return (
    <div className="textArea" tabIndex="0" ref={inputRef}>
      <div className="outOfFocus" id="outOfFocus">
        Click Here To Focus
      </div>
      <InsertionPoint />
      <div
        className="displayText"
        ref={divRef}
        style={{ backgroundColor: inputLocked ? "lightblue" : "transparent" }}
      >
        {wordsArray.map((word, wordIndex) => (
          <div
            key={wordIndex}
            className={
              inputArray.length - 1 === wordIndex ? "word active" : "word"
            }
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
        ))}
      </div>
    </div>
  );
}

export default DisplayText;
