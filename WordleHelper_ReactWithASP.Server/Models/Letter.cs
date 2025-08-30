using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordleHelper_ReactWithASP.Server.Models;

public class Letter : INotifyPropertyChanged, IEquatable<Letter>
{
    [Required]
    public char Value { get; }
    public char ValueUpper => char.ToUpper(Value);

    LetterCorrectness _correctness;

    public LetterCorrectness Correctness
    {
        get => _correctness;
        set
        {
            _correctness = value;
            NotifyPropertyChanged(nameof(Correctness));
        }
    }

    public Letter(char value)
    {
        ValidateIsAlphabetical(value);

        Value = value;
        Correctness = LetterCorrectness.NotPresent;
    }

    public Letter(char value, LetterCorrectness correctness)
    {
        ValidateIsAlphabetical(value);

        Value = value;
        Correctness = correctness;
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    private static void ValidateIsAlphabetical(char letter)
    {
        if (!char.IsLetter(letter))
        {
            throw new ArgumentException(
                $"{
                letter} is not a letter. Acceptable chars include a-z and A-Z."
            );
        }
    }

    public LetterCorrectness CycleLetterCorrectness()
    {
        switch (Correctness)
        {
            case LetterCorrectness.NotPresent:
                Correctness = LetterCorrectness.AdjustPostion;
                break;
            case LetterCorrectness.AdjustPostion:
                Correctness = LetterCorrectness.Correct;
                break;
            case LetterCorrectness.Correct:
                Correctness = LetterCorrectness.NotPresent;
                break;
        }

        NotifyPropertyChanged(nameof(Correctness));

        return Correctness;
    }

    public void NotifyPropertyChanged(string propName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propName));
    }

    public bool Equals(Letter? other)
    {
        ArgumentNullException.ThrowIfNull(other);

        return other.Value.Equals(Value);
    }

    public override bool Equals(object? obj)
    {
        ArgumentNullException.ThrowIfNull(obj);

        return obj is Letter letter && Equals(letter);
    }

    public override int GetHashCode()
    {
        return Value.GetHashCode();
    }
}
