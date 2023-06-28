namespace BugTracker.Contracts.Bug;

public record UpsertBugRequest(
    string Name,
    string Description,
    string Creator,
    List<string> Collaborators,
    DateTime CreationDateTime,
    DateTime ClosingDateTime
);