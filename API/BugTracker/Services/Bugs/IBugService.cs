using BugTracker.Models;

namespace BugTracker.Services.Bugs;

public interface IBugService
{
    void CreateBug(Bug bug);

    Bug GetBug(Guid id);
}