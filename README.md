## Wordle Helper (React with ASP.NET)
### About
Generates solutions for the day's Wordle based on what you've already guessed.

Useful if you simply don't know what the word could be!

<img width="594" height="780" alt="image" src="https://github.com/user-attachments/assets/78fa87ff-e3d8-4769-8cbd-b4af71561448" />

Provides the same functionality as [Wordle Helper](https://github.com/dLogan807/wordle-helper), except with a React frontend and an ASP.NET backend.

### Requirments
- .NET 8.0
- Node.js 24.3.0

### How it works

The app generates a regex pattern from the guesses you have entered. It then compares that pattern with each valid Wordle guess and lists every possible word. 
Architectuarlly, the backend does not maintain state and exposes two APIs:
- /guess/validate
  - Accepts: {
  guess: string;
  prevGuesses: string[];
}
  - Returns: {
  validated: boolean;
  message: string;
}
- /guess/possiblewords
  - Accepts: Guess[]
  - Returns: string[]
In practice, there is no need for a backend. However, this project was developed as an exercise to explore some of ASP.NET.
