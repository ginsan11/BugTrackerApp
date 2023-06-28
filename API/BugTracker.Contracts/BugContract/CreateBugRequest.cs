namespace BugTracker.Contracts.BugContract;


public record CreateBugRequest(
    string Name,
    string Description,
    string Creator,
    List<string> Collaborators,
    DateTime StartDateTime,
    DateTime EndDateTime
);