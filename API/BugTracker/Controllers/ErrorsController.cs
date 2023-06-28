using Microsoft.AspNetCore.Mvc;

namespace BugTracker.Controllers;

public class ErrorsController : ControllerBase{
    [Route("/error")]

    public IActionResult Error(){
        return Problem();
    }
}