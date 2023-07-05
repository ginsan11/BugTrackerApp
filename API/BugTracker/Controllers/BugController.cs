using Microsoft.AspNetCore.Mvc;
using BugTracker.Services.Bugs;
using BugTracker.Models;
using BugTracker.Contracts.BugContract;
using ErrorOr;
using BugTracker.ServiceErrors;
using BugTracker.Controllers;




namespace BugTracker.Contracts.Controllers;

/// <summary>
/// Controller for managing Bug-related operations.
/// </summary>
public class BugController : ApiController{

    /// <summary>
    /// The BugService used to perform Bug-related operations.
    /// </summary>
    private readonly IBugService _bugService;

    /// <summary>
    /// Creates a new BugController.
    /// </summary>
    public BugController(IBugService bugService){
        _bugService = bugService;
    }

    /// <summary>
    /// Maps a Bug object to a BugResponse object.
    /// </summary>
    private static BugResponse MapBugResponse(Bug bug){
        return new BugResponse (
            bug.Id,
            bug.Name,
            bug.Description,
            bug.Creator,
            bug.Collaborators,
            bug.StartDateTime,
            bug.EndDateTime,
            bug.LastModified,
            bug.Status,
            bug.Linkedbugs,
            bug.Tags,
            bug.Severity
        );
    }

    /// <summary>
    /// Creates a CreatedAtActionResult for the GetBug action.
    /// </summary>
    private CreatedAtActionResult CreatedAtGetBug(Bug bug){
        return CreatedAtAction(
            actionName: nameof(GetBug), 
            routeValues: new{id = bug.Id}, 
            value: MapBugResponse(bug));
    }

    [HttpPost("")]
    /// <summary>
    /// Creates a new Bug.
    /// </summary>
    /// <param name="request">The request object containing Bug data.</param>
    /// <returns>The created Bug.</returns>
    public IActionResult CreateBug(CreateBugRequest request){
        // Convert the request to a Bug object
        ErrorOr<Bug> requestToBugResult = Bug.From(request);

        // Check if the conversion was successful
        if (requestToBugResult.IsError){
            return Problem(requestToBugResult.Errors);
        }

        var bug = requestToBugResult.Value;


        
        // Create the Bug and return the response
        ErrorOr<Created> createdBugResult = _bugService.CreateBug(bug);

        return createdBugResult.Match(
            createdBugResult => CreatedAtGetBug(bug),
            errors => Problem(errors)
        );
    }

    [HttpGet("{id:guid}")]
    /// <summary>
    /// Retrieves a Bug by its ID.
    /// </summary>
    /// <param name="id">The ID of the Bug.</param>
    /// <returns>The Bug with the specified ID.</returns>
    public IActionResult GetBug(Guid id){

        // Get the Bug by its ID
        ErrorOr<Bug> getBugResult = _bugService.GetBug(id);


        //var bug = getBugResult.Value;

        return getBugResult.Match(
            bug => Ok(MapBugResponse(bug)), 
            errors => Problem(errors));
    }

    [HttpGet("mybug/{myname:length(1,255)}")]
    /// <summary>
    /// Retrieves the Bugs associated with the specified name.
    /// </summary>
    /// <param name="myname">The name to retrieve Bugs for.</param>
    /// <returns>The Bugs associated with the specified name.</returns>
    public IActionResult GetMyBugs(String myname){

        // Get the List of Bugs by its user name
        ErrorOr<List<Bug>> getMyBugResult = _bugService.GetMyBugs(myname);
        
        //Checks to see if error is returns from GetMYBugs
        if (getMyBugResult.IsError)
        {
        //Returns if error
        return Problem(getMyBugResult.Errors);
        }

        //Creates a list of bugs from the result of GetMyBugs (because list of ErrorOr<Bug> is not  sfsdfsd)
        List<Bug> bugs = getMyBugResult.Value;
        
        //Creates a list of BugResponses to return all the OK bugs
        List<BugResponse> bugResponses = new List<BugResponse>();

        //Loops through the list of bugs and adds them to the list of BugResponses if they no errors
        foreach (Bug bug in bugs)
        {
            //Converts the Bug to a BugResponse
            ErrorOr<BugResponse> bugResponseResult = MapBugResponse(bug);

            if (bugResponseResult.IsError){
            return Problem(bugResponseResult.Errors);
            }

            BugResponse bugResponse = bugResponseResult.Value;

            //Adds the BugResponse to the list of BugResponses
            bugResponses.Add(bugResponse);
    }
    
        return Ok(bugResponses);
    }

[HttpGet("allbugs")]
/// <summary>
/// Retrieves All the Bugs in the database.
/// </summary>
/// <returns>Retrieves all the Bugs in the database.</returns>
public IActionResult GetAllBugs()
{
    // Get all bugs from the Bug table
    ErrorOr<List<Bug>> getAllBugsResult = _bugService.GetAllBugs();

    if (getAllBugsResult.IsError)
    {
        // Return an error response if there was an issue retrieving the bugs
        return Problem(getAllBugsResult.Errors);
    }

    List<Bug> bugs = getAllBugsResult.Value;

    // Create a list of BugResponses to return all the valid bugs
    List<BugResponse> bugResponses = new List<BugResponse>();

    foreach (Bug bug in bugs)
    {
        // Convert the Bug to a BugResponse
        ErrorOr<BugResponse> bugResponseResult = MapBugResponse(bug);

        if (bugResponseResult.IsError)
        {
            // Return an error response if there was an issue mapping the Bug to BugResponse
            return Problem(bugResponseResult.Errors);
        }

        BugResponse bugResponse = bugResponseResult.Value;

        // Add the BugResponse to the list of BugResponses
        bugResponses.Add(bugResponse);
    }

    return Ok(bugResponses);
}


    [HttpPut("{id:guid}")]
    /// <summary>
    /// Upserts a Bug with the specified ID and request data.
    /// </summary>
    /// <param name="id">The ID of the Bug to upsert.</param>
    /// <param name="request">The request object containing Bug data.</param>
    /// <returns>The upserted Bug.</returns>
    public IActionResult UpsertBug(Guid id, UpsertBugRequest request){

        // Convert the request to a Bug object
        ErrorOr<Bug> requestToBugResult = Bug.From(id, request);

        // Check if the conversion was successful
        if (requestToBugResult.IsError){
            return Problem(requestToBugResult.Errors);
        }

        var bug = requestToBugResult.Value;

        // Upsert the Bug and return the response
        ErrorOr<UpsertedBug> upsertBugResult = _bugService.UpsertBug(bug);


        return upsertBugResult.Match(
            upserted => upserted.IsNewlyCreated ? CreatedAtGetBug(bug) : NoContent(), //was this newly created? if not NoContent
            errors => Problem(errors));
    }
    
    [HttpDelete("{id:guid}")]
    /// <summary>
    /// Deletes a Bug with the specified ID.
    /// </summary>
    /// <param name="id">The ID of the Bug to delete.</param>
    /// <returns>NoContent if the Bug was deleted successfully.</returns>
    public IActionResult DeletetBug(Guid id){

        // Delete the Bug and return the response
        ErrorOr<Deleted> deleteBugResult = _bugService.DeletetBug(id);

        return deleteBugResult.Match(
            deleted => NoContent(),
            errors => Problem(errors));
    }
}
