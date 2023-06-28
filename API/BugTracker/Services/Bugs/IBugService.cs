using BugTracker.Models;

namespace BugTracker.Services.Bugs;

public interface IBugService
{
    void CreateBug(Bug bug);

    Bug GetBug(Guid id);

    void UpsertBug(Bug bug);
    
    void DeletetBug(Guid id);
}