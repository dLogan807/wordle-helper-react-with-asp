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

    public bool IsValidGuess(Guess[] guesses, string thisGuess)
    {
        if (string.IsNullOrEmpty(thisGuess))
            return false;

        thisGuess = thisGuess.ToLower();

        if (
            thisGuess.Length != _wordLength
            || guesses.Length > _maxGuesses
            || !thisGuess.All(char.IsLetter)
        )
        {
            return false;
        }

        return IsExistingAndNotGuessed(guesses, thisGuess);
    }

    private bool IsExistingAndNotGuessed(Guess[] guesses, string thisGuess)
    {
        Word word = new(thisGuess);

        foreach (Guess guess in guesses)
        {
            if (guess.Equals(thisGuess))
                return false;
        }

        return Words.Contains(word);
    }

    public Word[] GetPossibleWords(List<Guess> guesses)
    {
        if (guesses == null || guesses.Count == 0)
        {
            return [];
        }

        Regex regex = _wordRegexBuilder.GenerateRegex(guesses);

        Word[] possibleWords = [.. Words.Where(word => regex.IsMatch(word.WordString))];

        return possibleWords;
    }
}
