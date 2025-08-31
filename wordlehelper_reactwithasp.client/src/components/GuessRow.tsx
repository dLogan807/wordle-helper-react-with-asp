import React, { useState } from "react";
import LetterButton from "./LetterButton";
import { Letter } from "../App";

export default function GuessRow(letters: Letter[]) {
  let letterButtons = letters.map((letter, idx) => (
    <LetterButton key={idx} {...letter} />
  ));

  return <div>{letterButtons}</div>;
}
