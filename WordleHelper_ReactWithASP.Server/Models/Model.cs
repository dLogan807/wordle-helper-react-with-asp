using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace WordleHelper_ReactWithASP.Server.Models;

public class Model
{
    public readonly int _wordLength;
    public readonly int _maxGuesses;

    public readonly HashSet<Word> Words;

    private readonly WordRegexBuilder _wordRegexBuilder;

    public Model(string wordAssetPath, int wordLength, int maxGuesses)
    {
        _wordLength = wordLength;
        _maxGuesses = maxGuesses;
        _wordRegexBuilder = new(_wordLength);

        Words = LoadWords(wordAssetPath);
    }

    private HashSet<Word> LoadWords(string wordFileName)
    {
        string path = Path.Combine(Environment.CurrentDirectory, @"Assets/", wordFileName);

        Debug.WriteLine($"Loading words from {path}");

        using Stream stream = File.OpenRead(path);
        using BufferedStream bs = new(stream);
        using StreamReader sr = new(bs);

        HashSet<Word> wordList = [];

        while (!sr.EndOfStream)
        {
            string? word = sr.ReadLine();

            if (string.IsNullOrEmpty(word) || word.Length != _wordLength)
                continue;

            wordList.Add(new Word(word.Trim()));
        }

        Debug.WriteLine($"Loaded {wordList.Count} words!");

        return wordList;
    }

    public ValidationResponse IsValidGuess(GuessValidation req)
    {
        ValidationResponse response = new(false, $"Must be {_wordLength} letters");

        if (
            string.IsNullOrEmpty(req.Guess)
            || req.Guess.Length != _wordLength
            || !req.Guess.All(char.IsLetter)
        )
            return response;

        if (req.PrevGuesses.Length >= _maxGuesses)
        {
            response.Message = "Maximum guesses reached";
            return response;
        }

        return IsExistingAndNotGuessed(req);
    }

    private ValidationResponse IsExistingAndNotGuessed(GuessValidation req)
    {
        foreach (string guess in req.PrevGuesses)
        {
            if (guess.Equals(req.Guess))
                return new(false, "Already guessed");
        }

        Word word = new(req.Guess.ToLower());
        if (!Words.Contains(word))
        {
            return new(false, "Not in word list");
        }

        return new(true, "Valid guess");
    }

    public string[] GetPossibleWords(List<Guess> guesses)
    {
        if (guesses == null || guesses.Count == 0)
        {
            return [];
        }

        Regex regex = _wordRegexBuilder.GenerateRegex(guesses);

        string[] possibleWords =
        [
            .. Words.Where(word => regex.IsMatch(word.WordString)).Select(word => word.WordString),
        ];

        return possibleWords;
    }
}
