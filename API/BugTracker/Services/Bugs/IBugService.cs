namespace BugTracker.Services.Bug;

public interface IBugService
{
    void CreateBug(Bug request);

    Bug GetBug(Guid id);
}