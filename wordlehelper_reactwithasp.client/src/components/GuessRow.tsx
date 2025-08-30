import React, { useState } from "react";
import LetterButton, { Letter } from "./LetterButton";

export default function GuessRow(letters: Letter[]) {
  let letterButtons = letters.map((letter, idx) => (
    <LetterButton key={idx} {...letter} />
  ));

  return <div>{letterButtons}</div>;
}
