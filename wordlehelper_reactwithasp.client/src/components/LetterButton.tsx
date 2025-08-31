import React, { useEffect, useState } from "react";
import "./LetterButton.css";
import { Property } from "csstype";
import { Letter } from "../App";

enum LetterColor {
  Gray = "#3a3a3c",
  Yellow = "#b59f3b",
  Green = "#538d4e",
}

function getBackgroundColor(colorNum: number): LetterColor {
  if (colorNum === 0) {
    return LetterColor.Gray;
  } else if (colorNum === 1) {
    return LetterColor.Yellow;
  }

  return LetterColor.Green;
}

function CycleLetterCorrectness(letter: Letter) {
  letter.correctness =
    letter.correctness >= 2 ? (letter.correctness = 1) : letter.correctness++;
}

export default function LetterButton(letter: Letter): React.ReactElement {
  const [backgroundColor, setBackgroundColor] =
    useState<Property.BackgroundColor>(getBackgroundColor(letter.correctness));

  useEffect(() => {
    setBackgroundColor(getBackgroundColor(letter.correctness));
  }, [letter.correctness]);

  return (
    <button
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={() => {
        CycleLetterCorrectness(letter);
      }}
    >
      <div>
        <p>{letter.value}</p>
      </div>
    </button>
  );
}
