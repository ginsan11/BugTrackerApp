using BugTracker.Models;
using ErrorOr;
using BugTracker.ServiceErrors;

namespace BugTracker.Services.Bugs;

public class BugService : IBugService{

    private static readonly Dictionary<Guid, Bug> bugdict = new();

    public ErrorOr<Created> CreateBug(Bug bug){
        bugdict.Add(bug.Id, bug);
        return Result.Created;

    }

    public ErrorOr<Bug> GetBug(Guid id){
        if(bugdict.TryGetValue(id, out var bug)){
            return bug;
        }
        return Errors.Bug.NotFound;
    }

    public ErrorOr<UpsertedBug> UpsertBug(Bug bug){
        var IsNewlyCreated = !bugdict.ContainsKey(bug.Id); //if the bug dict doesnt contain the id then create a new one
        bugdict[bug.Id] = bug;
        return new UpsertedBug(IsNewlyCreated);

    }

    public ErrorOr<Deleted> DeletetBug(Guid id){
        if(bugdict.TryGetValue(id, out var bug)){
            bugdict.Remove(id);
            return Result.Deleted;
        }
        return Errors.Bug.NotFound;
    }
}

