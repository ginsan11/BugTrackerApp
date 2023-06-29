using BugTracker.Models;
using ErrorOr;

namespace BugTracker.Services.Bugs;

public interface IBugService
{
    ErrorOr<Created> CreateBug(Bug bug);

    ErrorOr<Bug> GetBug(Guid id);

    ErrorOr<UpsertedBug> UpsertBug(Bug bug);
    
    ErrorOr<Deleted> DeletetBug(Guid id);
}