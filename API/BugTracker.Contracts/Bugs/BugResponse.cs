namespace BugTracker.Contracts.Bugs;

public record BugResponse(
    Guid Id,
    string Name,
    string Description,
    string Creator,
    List<string> Collaborators,
    DateTime CreationDateTime,
    DateTime ClosingDateTime,
    DateTime LastModified
);