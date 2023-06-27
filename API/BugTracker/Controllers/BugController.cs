using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Contracts.Controllers;

[ApiController]
public class BreakfastController : ControllerBase{
    [HttpPost("/bug")]

    public IActionResult CreateBug(CreateBugRequest request){
        return Ok();
    }
}
