namespace BugTracker.Contracts.BugContract;

public record UpsertBugRequest(
    string Name,
    string Description,
    string Creator,
    List<string> Collaborators,
    DateTime StartDateTime,
    DateTime EndDateTime
);