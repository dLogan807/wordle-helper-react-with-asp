import React, { useEffect, useState } from "react";
import "./App.css";

export type Letter = {
  value: string;
  color: number;
};

type Guess = {
  wordString: string;
  letters: Letter[];
};

type ValidationResponse = {
  validated: boolean;
  message: string;
};

type ValidationRequest = {
  guess: string;
  prevGuesses: string[];
};

function App() {
  const [results, setResults] = useState<string[]>([]);

  const guesses: Guess[] = [];

  useEffect(() => {});

  return (
    <div>
      <h1 id="tableLabel">Guesses</h1>
      <p>This component demonstrates data from the server.</p>
    </div>
  );

  async function validateGuess(
    guessValidReq: ValidationRequest
  ): Promise<ValidationResponse> {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request("/validate", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(guessValidReq),
    });

    const response: ValidationResponse = await fetch(request)
      .then((res) => res.json())
      .then((data) => ({
        validated: data.validated,
        message: data.message,
      }))
      .catch(() => ({
        validated: false,
        message: "Server error checking guess",
      }));

    return response;
  }

  async function getPossibleWords(guesses: Guess[]): Promise<string[]> {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request("/possiblewords", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(guesses),
    });

    const response: string[] = await fetch(request)
      .then((res) => res.json())
      .catch(() => []);

    return response;
  }
}

export default App;
