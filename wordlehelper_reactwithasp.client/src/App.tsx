import React, { useEffect, useRef, useState } from "react";
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

const BACKEND: string = "https://localhost:7105";

export default function App() {
  const [results, setResults] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const [guessSuccess, setGuessSuccess] = useState<ValidationResponse>();

  const testGuesses: Guess[] = [
    {
      wordString: "snark",
      letters: [
        {
          value: "s",
          correctness: 1,
        },
        {
          value: "n",
          correctness: 0,
        },
        {
          value: "a",
          correctness: 2,
        },
        {
          value: "r",
          correctness: 0,
        },
        {
          value: "k",
          correctness: 0,
        },
      ],
    },
    {
      wordString: "blast",
      letters: [
        {
          value: "b",
          correctness: 0,
        },
        {
          value: "l",
          correctness: 1,
        },
        {
          value: "a",
          correctness: 2,
        },
        {
          value: "s",
          correctness: 2,
        },
        {
          value: "t",
          correctness: 2,
        },
      ],
    },
  ];

  useEffect(() => {
    getPossibleWords(testGuesses);
  }, []);

  const guessGrid: React.ReactElement =
    guesses === undefined ? (
      <p>No guesses yet.</p>
    ) : (
      <ul>
        {guesses.map((guess) => (
          <li>{guess.wordString}</li>
        ))}
      </ul>
    );

  const contents: React.ReactElement =
    results === undefined ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h3>Got results!</h3>
        <p>{results}</p>
      </div>
    );

  const formRef = useRef<HTMLFormElement>(null);

  //Inform of issues with guess
  const formMessage: React.ReactNode =
    guessSuccess?.message !== null && guessSuccess?.validated == false ? (
      <p className="form_message">{guessSuccess?.message}</p>
    ) : null;

  return (
    <div>
      <h1>Wordle Helper</h1>
      <p>Provides possible words from what you've guessed.</p>
      <form
        className="add_guess_form"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const guess = formData.get("guess") as string;
          validateGuess({ guess, prevGuesses: guessesToArray(guesses) });
        }}
      >
        <input name="guess" placeholder="Enter guess" />
        <button type="submit">Add</button>
      </form>
      {formMessage}
      {guessGrid}
      {contents}
    </div>
  );

  async function validateGuess(
    guessValidReq: ValidationRequest
  ): Promise<ValidationResponse> {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(`${BACKEND}/guess/validate`, {
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
        message: "A server error occured",
      }));

    if (response.validated) {
      formRef.current?.reset();
      setGuesses([...guesses, convertToGuess(guessValidReq.guess)]);
    }
    setGuessSuccess(response);
    console.log(response);

    return response;
  }

  async function getPossibleWords(guesses: Guess[]): Promise<string[]> {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(`${BACKEND}/guess/possiblewords`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(guesses),
    });

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

  function guessesToArray(guesses: Guess[]): string[] {
    const stringGuesses: string[] = guesses.map((guess) => guess.wordString);
    return stringGuesses;
  }

  function convertToGuess(guessString: string): Guess {
    const letters: Letter[] = guessString.split("").map((letterString) => ({
      value: letterString,
      correctness: 0,
    }));

    const guess: Guess = {
      wordString: guessString,
      letters: letters,
    };

    console.log("converted to guess");

    return guess;
  }
}
