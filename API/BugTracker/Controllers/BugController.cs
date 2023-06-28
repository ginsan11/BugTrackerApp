using Microsoft.AspNetCore.Mvc;
using BugTracker.Contracts.Bug;
using BugTracker.Services.Bugs;
using BugTracker.Models;


namespace BugTracker.Contracts.Controllers;

[ApiController]
[Route("bug")] //"[controller]" can be used instead and uses class name minus the word controlloer 
public class BugController : ControllerBase{

    private readonly IBugService _bugService;

    public BugController(IBugService bugService){
        _bugService = bugService;
    }

    [HttpPost("")]
    public IActionResult CreateBug(CreateBugRequest request){
        var bug = new Bug (
            Guid.NewGuid(),
            request.Name,
            request.Description,
            request.Creator,
            request.Collaborators,
            request.StartDateTime,
            request.EndDateTime,
            DateTime.UtcNow
        );


        // TODO: save breakfast to database
        _bugService.CreateBug(bug);

        var response = new Bug (
            bug.NewGuid(),
            bug.Name,
            bug.Description,
            bug.Creator,
            bug.Collaborators,
            bug.StartDateTime,
            bug.EndDateTime,
            bug.LastModifiedDateTime
        );

        return CreatedAtAction(
            actionName: nameof(GetBug), 
            routeValues: new{id = bug.Id}, 
            value: response);
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetBug(Guid id){

        Bug bug = _bugService.GetBug(id);

        var response = new BugResponse(
            bug.NewGuid(),
            bug.Name,
            bug.Description,
            bug.Creator,
            bug.Collaborators,
            bug.StartDateTime,
            bug.EndDateTime,
            bug.LastModifiedDateTime
        );
        return Ok(response);
    }

    [HttpPut("{id:guid}")]
    public IActionResult UpsertBug(Guid id, UpsertBugRequest request){
        return Ok(request);
    }
    
    [HttpDelete("{id:guid}")]
    public IActionResult DeletetBug(Guid id){
        return Ok(id);
    }
}
