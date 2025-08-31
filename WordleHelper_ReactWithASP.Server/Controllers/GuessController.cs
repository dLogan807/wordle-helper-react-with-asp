using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using WordleHelper_ReactWithASP.Server.Models;

namespace WordleHelper_ReactWithASP.Server.Controllers
{
    [ApiController]
    public class GuessController(ILogger<GuessController> logger) : ControllerBase
    {
        private readonly ILogger<GuessController> _logger = logger;

        private static readonly Model Model = new("words.txt", 5, 6);

        [HttpPost("[controller]/validate/")]
        public ActionResult<ValidationResponse> IsValidGuess(
            [FromBody] GuessValidation validationRequest
        )
        {
            return Ok(Model.IsValidGuess(validationRequest));
        }

        [HttpPost("[controller]/possiblewords/")]
        public IEnumerable<string> GetPossibleWords(Guess[] guesses)
        {
            List<Guess> guessList = [.. guesses];

            return Model.GetPossibleWords(guessList);
        }
    }
}
