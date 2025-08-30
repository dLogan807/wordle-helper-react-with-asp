using Microsoft.AspNetCore.Mvc;
using WordleHelper_ReactWithASP.Server.Models;

namespace WordleHelper_ReactWithASP.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GuessController : ControllerBase
{
    private static readonly Model Model = new(
        "WordleHelper_ReactWithASP.Server.Assets.words.txt",
        5,
        6
    );

    [HttpPost]
    public bool IsValidGuess(string[] guesses, string word)
    {
        return Model.IsValidGuess(guesses, word);
    }

    [HttpPost]
    public Word[] GetPossibleWords(Guess[] guesses)
    {
        List<Guess> guessList = [.. guesses];

        return Model.GetPossibleWords(guesses);
    }
}
