import React, { useRef, useEffect } from "react";
import { useGameStore } from "../../../store/useGameStore.jsx";
import { useRoomStore } from "../../../store/useRoomStore.jsx";
import { useMetricsStore } from "../../../store/useMetricsStore.jsx";
import InsertionPoint from "./insertionPoint.jsx";

function DisplayText({ words }) {
  const { userInput, inputArray, inputLocked, setUserInput, freezeInput } =
    useGameStore();
  const {
    correct,
    incorrect,
    setIncorrectIndices,
    incorrectIndices,
    setProgress,
    setCorrect,
    setCalAcc,
  } = useMetricsStore.getState();
  const { updateProgress } = useRoomStore.getState();
  //console.log(inputArray);
  const userInputRef = useRef(userInput);
  const inputLockedRef = useRef(inputLocked);
  //console.log("userInput from main():", userInput);
  const wordsArray = words; //words; //sampleText.split(" "); //[];
  const inputRef = useRef(null);
  const divRef = useRef(null);
  let blurTimeout;

  useEffect(() => {
    userInputRef.current = userInput;
    inputLockedRef.current = inputLocked;
  }, [userInput, inputLocked]);

  const handleText = (event) => {
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
          //console.log("input:", input);
          break;
        default:
          input = userInputRef.current;
      }
      setUserInput(input);

      // Calculate stats and progress
      const calculateStats = (input, words, incorrect) => {
        const incorrectBefore = incorrect;
        console.log("incorrectBefore:", incorrectBefore);
        const inputWordsArr = input.split(" ");
        const inputWordsLen = inputWordsArr.length;
        const inputLastWordInd = inputWordsLen - 1;
        const inputLastWord = inputWordsArr[inputLastWordInd];
        // console.log("inputWordsArr", inputWordsArr);
        // console.log("inputWordsLen", inputWordsLen);
        // console.log("inputLastWordInd", inputLastWordInd);
        // console.log("inputLastWord", inputLastWord);
        //calculate the progress
        const progress = Math.min(
          (input === "" ? 0 : inputWordsLen / words.length) * 100,
          100
        );
        setProgress(progress);
        //calculate the incorrect
        if (inputLastWord) {
          if (inputLastWord.length <= words[inputLastWordInd].length) {
            if (
              inputLastWord[inputLastWord.length - 1] !==
              words[inputLastWordInd][inputLastWord.length - 1]
            ) {
              //set incorrectindices here
              setIncorrectIndices(
                inputLastWordInd * 1000 + inputLastWord.length - 1
              );
              console.log(
                "incorrectIndices:",
                useMetricsStore.getState().incorrectIndices
              );
              console.log("incorrect from inside the loop:", incorrect + 1);
            }
          } else {
            setIncorrectIndices(
              inputLastWordInd * 1000 + inputLastWord.length - 1
            );
          }
        }
        console.log("incorrect:", useMetricsStore.getState().incorrect);
        //calculate the correct
        let correct = 0;
        inputWordsArr.forEach((word, wordIndex) => {
          word.split("").forEach((char, charIndex) => {
            if (
              words[wordIndex][charIndex] &&
              words[wordIndex][charIndex] === char
            ) {
              correct++;
            }
          });
        });
        setCorrect(correct);
        setCalAcc();
        console.log("Accuracy:", useMetricsStore.getState().accuracy);
        console.log("Correct:", useMetricsStore.getState().correct);
      };
      if (words && words.length > 0) {
        calculateStats(input, words, incorrect);
        console.log("stats:", useMetricsStore.getState().stats);
        useRoomStore
          .getState()
          .updateProgress(useMetricsStore.getState().stats); // this will updateprogress to server through the Roomstore
      }
      //send playerprogress through socket to server
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
