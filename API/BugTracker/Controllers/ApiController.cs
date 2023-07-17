using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ErrorOr;



namespace BugTracker.Controllers;


[ApiController]
[Route("bug")] //"[controller]" can be used instead and uses class name minus the word controlloer 

public class ApiController : ControllerBase{

    protected IActionResult Problem(List<Error> errors){

        if (errors.All(e => e.Type == ErrorType.Validation)){
            var modelStateDictionary = new ModelStateDictionary();
            foreach(var error in errors){
                modelStateDictionary.AddModelError(error.Code, error.Description);
                Console.WriteLine(error.Description);
            }
            return ValidationProblem(modelStateDictionary);
        }

        if (errors.Any(e => e.Type == ErrorType.Unexpected)){
            return Problem(); //500 internal Server Error 
        }
        
        var firstError = errors[0];

        var statusCode = firstError.Type switch{
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };

        return Problem(statusCode: statusCode, title: firstError.Description);
    }


}