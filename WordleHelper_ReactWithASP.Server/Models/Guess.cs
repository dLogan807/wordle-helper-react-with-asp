using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WordleHelper_ReactWithASP.Server.Models;

public class Guess : Word
{
    public Letter[] Letters { get; } = new Letter[5];

    public Guess(string word)
        : base(word)
    {
        for (int i = 0; i < word.Length; i++)
        {
            Letters[i] = new(word[i]);
        }
    }

    [JsonConstructorAttribute]
    public Guess(Letter[] letters, string wordstring)
        : base(wordstring)
    {
        Letters = letters;
    }
}
