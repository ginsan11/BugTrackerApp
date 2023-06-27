namespace BugTracker.Contracts.Bugs;

public record CreateBugRequest(
    string Name,
    string Description,
    string Creator,
    List<string> Collaborators,
    DateTime CreationDateTime,
    DateTime ClosingDateTime
);