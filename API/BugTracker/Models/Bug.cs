namespace BugTracker.Models;

public class Bug{
    public Guid Id { get; }
    public string Name { get; }
    public string Description { get; }
    public string Creator { get; }
    public List<string> Collaborators { get; }
    public DateTime StartDateTime { get; }
    public DateTime EndDateTime { get; }
    public DateTime LastModifiedDateTime { get; }

    public Bug(Guid id, string name, string description, string creator, List<string> collaborators, DateTime startDateTime, DateTime endDateTime, DateTime lastModifiedDateTime){

        Id = id;
        Name = name;
        Description = description;
        Creator = creator;
        Collaborators = collaborators;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
        LastModifiedDateTime = lastModifiedDateTime;
    }

};

