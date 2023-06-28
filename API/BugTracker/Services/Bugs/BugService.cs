using BugTracker.Service.IBugService;

namespace BugTracker.Services.Bug;

public class BugService : IBugService{

    private readonly Dictionary<Guid, Bug> _bug = new();

    public void CreateBug(Bug bug){
        _bug.Add(bug.Id, bug);

    }

    public Bug GetBug(Guid id){
        return _breakfast[id];
    }
}
