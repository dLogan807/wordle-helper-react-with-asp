import React from "react";
import "./LetterButton.css";
import { Property } from "csstype";

export type Letter = {
  value: string;
  color: number;
};

enum LetterColor {
  Gray = "#3a3a3c",
  Yellow = "#b59f3b",
  Green = "#538d4e",
}

function GetBackgroundColor(colorNum: number): LetterColor {
  if (colorNum === 0) {
    return LetterColor.Gray;
  } else if (colorNum === 1) {
    return LetterColor.Yellow;
  }

  return LetterColor.Green;
}

export default function LetterButton(letter: Letter): React.ReactElement {
  const backgroundColor: Property.BackgroundColor = GetBackgroundColor(
    letter.color
  );

  return (
    <button
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div>
        <p>{letter.value}</p>
      </div>
    </button>
  );
}
