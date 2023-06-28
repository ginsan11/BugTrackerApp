using BugTracker.Models;

namespace BugTracker.Services.Bugs;

public class BugService : IBugService{

    private static readonly Dictionary<Guid, Bug> bugdict = new();

    public void CreateBug(Bug bug){
        bugdict.Add(bug.Id, bug);

    }

    public Bug GetBug(Guid id){
        return bugdict[id];
    }

    public void UpsertBug(Bug bug){
        bugdict[bug.Id] = bug;

    }

    public void DeletetBug(Guid id){
        bugdict.Remove(id);
    }
}

