namespace WordleHelper_ReactWithASP.Server.Models;

public class GuessValidation(string guess, string[] prevGuesses)
{
    public string Guess { get; set; } = guess;

    public string[] PrevGuesses { get; set; } = prevGuesses;
}
