import React, { useEffect, useState } from "react";
import "./App.css";

export type Letter = {
  value: string;
  correctness: number;
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

  const guesses: Guess[] = [
    {
      wordString: "hello",
      letters: [
        {
          value: "h",
          correctness: 2,
        },
        {
          value: "e",
          correctness: 2,
        },
        {
          value: "l",
          correctness: 2,
        },
        {
          value: "l",
          correctness: 2,
        },
        {
          value: "o",
          correctness: 2,
        },
      ],
    },
  ];

  useEffect(() => {
    getPossibleWords(guesses);
  }, []);

  const contents =
    results === undefined ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h3>Got results!</h3>
        <p>{results}</p>
      </div>
    );

  return (
    <div>
      <h1 id="tableLabel">Guesses</h1>
      <p>This component demonstrates data from the server.</p>
      {contents}
    </div>
  );

  async function validateGuess(
    guessValidReq: ValidationRequest
  ): Promise<ValidationResponse> {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(
      `${process.env.REACT_APP_BACKEND}/guess/validate`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(guessValidReq),
      }
    );

    const response: ValidationResponse = await fetch(request)
      .then((res) => res.json())
      .then((data) => ({
        validated: data.validated,
        message: data.message,
      }))
      .catch(() => ({
        validated: false,
        message: "A server error occured",
      }));

    return response;
  }

  async function getPossibleWords(guesses: Guess[]): Promise<string[]> {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(
      `${process.env.REACT_APP_BACKEND}/guess/possiblewords`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(guesses),
      }
    );

    const response: string[] = await fetch(request)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
        return [];
      });

    setResults(response);
    console.log(response);
    return response;
  }
}

export default App;
