using Microsoft.AspNetCore.Mvc;
using WordleHelper_ReactWithASP.Server.Models;

namespace WordleHelper_ReactWithASP.Server.Controllers
{
    [ApiController]
    public class GuessController(ILogger<GuessController> logger) : ControllerBase
    {
        private readonly ILogger<GuessController> _logger = logger;

        private static readonly Model Model = new("words.txt", 5, 6);

        [HttpPost("[controller]/valid/")]
        public bool IsValidGuess([FromBody] Guess[] guesses, string thisGuess)
        {
            return Model.IsValidGuess(guesses, thisGuess);
        }

        [HttpPost("[controller]/possiblewords/")]
        public Word[] GetPossibleWords(Guess[] guesses)
        {
            List<Guess> guessList = [.. guesses];

            return Model.GetPossibleWords(guessList);
        }
    }
}
