using Microsoft.AspNetCore.Mvc;
using BugTracker.Services.Bugs;
using BugTracker.Models;
using BugTracker.Contracts.BugContract;
using ErrorOr;
using BugTracker.ServiceErrors;
using BugTracker.Controllers;




namespace BugTracker.Contracts.Controllers;

public class BugController : ApiController{

    private readonly IBugService _bugService;

    public BugController(IBugService bugService){
        _bugService = bugService;
    }

    private static BugResponse MapBugResponse(Bug bug){
        return new BugResponse (
            bug.Id,
            bug.Name,
            bug.Description,
            bug.Creator,
            bug.Collaborators,
            bug.StartDateTime,
            bug.EndDateTime,
            bug.LastModifiedDateTime
        );
    }

    private CreatedAtActionResult CreatedAtGetBug(Bug bug){
        return CreatedAtAction(
            actionName: nameof(GetBug), 
            routeValues: new{id = bug.Id}, 
            value: MapBugResponse(bug));
    }

    [HttpPost("")]
    public IActionResult CreateBug(CreateBugRequest request){
        ErrorOr<Bug> requestToBugResult = Bug.From(request);
        if (requestToBugResult.IsError){
            return Problem(requestToBugResult.Errors);
        }

        var bug = requestToBugResult.Value;


        // TODO: save Bug to database
        ErrorOr<Created> createdBugResult = _bugService.CreateBug(bug);

        return createdBugResult.Match(
            createdBugResult => CreatedAtGetBug(bug),
            errors => Problem(errors)
        );
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetBug(Guid id){

        ErrorOr<Bug> getBugResult = _bugService.GetBug(id);


        //var bug = getBugResult.Value;

        return getBugResult.Match(
            bug => Ok(MapBugResponse(bug)), 
            errors => Problem(errors));
    }

    [HttpPut("{id:guid}")]
    public IActionResult UpsertBug(Guid id, UpsertBugRequest request){
            ErrorOr<Bug> requestToBugResult = Bug.From(id, request);

        
        if (requestToBugResult.IsError){
            return Problem(requestToBugResult.Errors);
        }

        var bug = requestToBugResult.Value;
        ErrorOr<UpsertedBug> upsertBugResult = _bugService.UpsertBug(bug);

        // TODO: Retunr 201 if a new Bug created

        return upsertBugResult.Match(
            upserted => upserted.IsNewlyCreated ? CreatedAtGetBug(bug) : NoContent(), //was this newly created? if not NoContent
            errors => Problem(errors));
    }
    
    [HttpDelete("{id:guid}")]
    public IActionResult DeletetBug(Guid id){

        ErrorOr<Deleted> deleteBugResult = _bugService.DeletetBug(id);

        return deleteBugResult.Match(
            deleted => NoContent(),
            errors => Problem(errors));
    }
}
