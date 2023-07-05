using ErrorOr;
using BugTracker.ServiceErrors;
//sing BugTracker.Contracts.Bug;
using BugTracker.Contracts.BugContract;

namespace BugTracker.Models;

public class Bug{

    public const int MinNameLength = 3;
    public const int MaxNameLength = 50;

    public const int MinDescriptionLength = 3;
    public const int MaxDescriptionLength = 150;

    public Guid Id { get; }
    public string Name { get; }
    public string Description { get; }
    public string Creator { get; }
    public List<string> Collaborators { get; }
    public DateTime StartDateTime { get; }
    public DateTime EndDateTime { get; }
    public DateTime LastModified { get; }
    public int Status { get; }
    public List<Guid> Linkedbugs { get; }
    public List<String> Tags { get; }
    public int Severity { get; }



    private Bug(
        Guid id,
        string name, 
        string description, 
        string creator, 
        List<string> collaborators, 
        DateTime startDateTime, 
        DateTime endDateTime, 
        DateTime lastModified,
        int status,
        List<Guid> linkedbugs,
        List<String> tags,
        int severity){

        Id = id;
        Name = name;
        Description = description;
        Creator = creator;
        Collaborators = collaborators;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
        LastModified = lastModified;
        Status = status;
        Linkedbugs = linkedbugs;
        Tags = tags;
        Severity = severity;
    }

    public static ErrorOr<Bug> Create(
        string name,
        string description,
        string creator,
        List<string> collaborators,
        DateTime startDateTime,
        DateTime endDateTime,
        int status,
        List<Guid> linkedbugs,
        List<String> tags,
        int severity,
        DateTime ? lastModified = null,
        Guid ? id = null){

            List<Error> errors = new();

            if (name.Length is < MinNameLength or > MaxNameLength){
                errors.Add(Errors.Bug.InvalidName);

            }
            
            if (description.Length is < MinDescriptionLength or > MaxDescriptionLength){
                errors.Add(Errors.Bug.InvalidDescription);

            }

            if(errors.Count > 0){
                return errors;
            }
            collaborators.Add(creator);
            return new Bug(
                id ?? Guid.NewGuid(),
                name,
                description,
                creator,
                collaborators,
                startDateTime,
                endDateTime,
                lastModified ?? DateTime.UtcNow,
                status,
                linkedbugs,
                tags,
                severity
            );
        }

        public static ErrorOr<Bug> From(CreateBugRequest request){
            return Create(
            request.Name,
            request.Description,
            request.Creator,
            request.Collaborators,
            request.StartDateTime,
            request.EndDateTime,
            request.Status,
            request.Linkedbugs,
            request.Tags,
            request.Severity);
            
        }

        public static ErrorOr<Bug> From(Guid id, UpsertBugRequest request){
            return Create(
            request.Name,
            request.Description,
            request.Creator,
            request.Collaborators,
            request.StartDateTime,
            request.EndDateTime,
            request.Status,
            request.Linkedbugs,
            request.Tags,
            request.Severity,
            request.LastModified,
            id);
            
        }

        // public static ErrorOr<Bug> From(DateTime lastModifiedDateTime, Guid id, UpsertBugRequest request){
        //     return Create(
        //     request.Name,
        //     request.Description,
        //     request.Creator,
        //     request.Collaborators,
        //     request.StartDateTime,
        //     request.EndDateTime,
        //     request.Status,
        //     request.Linkedbugs,
        //     lastModifiedDateTime,
        //     id);
            
        // }


};

