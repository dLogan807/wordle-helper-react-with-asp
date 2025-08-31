namespace WordleHelper_ReactWithASP.Server.Models;

public class ValidationResponse(bool validated, string message)
{
    public bool Validated { get; set; } = validated;

    public string Message { get; set; } = message;
}
