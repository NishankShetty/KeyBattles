import React, { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../../store/useGameStore.jsx";

export default function InsertionPoint() {
  const inputArray = useGameStore.getState().inputArray;
  console.log(inputArray);

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const currentWordNo = inputArray.length;
    const currentLetterNo = inputArray[currentWordNo - 1].length;
    console.log("CurrentLetterNo:", currentLetterNo);
    console.log("CurrentWordNo", currentWordNo);

    const displayTextDiv = document.querySelector(".displayText");
    const currentWordDiv = document.querySelector(
      `.displayText > :nth-child(${currentWordNo})`
    );
    console.log(currentWordDiv);

    const displayText = displayTextDiv.getBoundingClientRect();
    const currentWord = currentWordDiv.getBoundingClientRect();

    let currentLetter, currentLetterDiv;
    let RelativeLeftLetter = 0;

    if (currentLetterNo != 0) {
      currentLetterDiv = document.querySelector(
        `.displayText > :nth-child(${currentWordNo}) > :nth-child(${currentLetterNo})`
      );
      currentLetter = currentLetterDiv.getBoundingClientRect();
      console.log("currentLetterDiv:", currentLetterDiv);
      console.log("currentLetter:", currentLetter);
      RelativeLeftLetter = currentLetter.right - currentWord.left;
      console.log(RelativeLeftLetter);
    }

    console.log("displayText:", displayText);
    console.log("currentWord:", currentWord);
    console.log("currentLetter", currentLetter);

    const RelativeTop = currentWord.top - displayText.top;
    const RelativeLeft = currentWord.left - displayText.left;

    setTop(RelativeTop - 2);
    setLeft(RelativeLeft + RelativeLeftLetter);
  }, [inputArray]);

  return (
    <div
      className="insertion-point"
      id="insertion-point"
      style={{
        width: "0.2rem",
        backgroundColor: "#e2b714",
        height: "2.2rem",
        position: "absolute",
        zIndex: "1",
        left: `${left}px`,
        top: `${top}px`,
      }}
    ></div>
  );
}
