import React, { useEffect, useState } from "react";
import { Letter } from "./LetterButton";

export default function Guesses(): React.ReactElement {
  const [guessRows, setGuessRows] = useState<Letter[][]>([]);

  let guesses = letters.map((letter, idx) => (
    <LetterButton key={idx} {...letter} />
  ));

  return <form></form>;
}
