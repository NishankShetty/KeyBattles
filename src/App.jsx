import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
//npm run dev to start
//Nishank Shetty
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

  const handleText = (event) => {
    let input = event.target.value;
    input = input.replace(/\s+/g, " ");
    setUserInput(input);
    setCursorPosition(input.length);
  };

  useEffect(() => {
    setInputArray(wordCount(userInput));
  }, [userInput]);

  return (
    <>
      <h2>KeyBattles</h2>
      <div className="textArea">
        <textarea
          className="inputText"
          spellCheck="false"
          onChange={handleText}
        ></textarea>
        <div className="displayText">
          {wordsArray.map((word, wordIndex) => (
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
                // Add cursor class
                {
                  console.log(wordIndex);
                }
                // const globalIndex =
                //   wordsArray.slice(0, wordIndex).join(" ").length +
                //   wordIndex +
                //   index;
                // if (globalIndex === cursorPosition) {
                //   className += " cursor";
                // }
                return (
                  <span key={index} className={className}>
                    {letter}
                  </span>
                );
              })}
              {/* Handle extra characters */}
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
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
