using ErrorOr;
using  BugTracker.Models;



namespace BugTracker.ServiceErrors;

public static class Errors{

    public static class Bug{


        public static Error InvalidName => Error.Validation( code: "Bug.InvalidName", 
        description: $" Bug ticket name must be at least {Models.Bug.MinNameLength} characters long and at most {Models.Bug.MaxNameLength} characters long.");

        public static Error InvalidDescription => Error.Validation( code: "Bug.InvalidDescription", 
        description: $" Bug ticket description must be at least {Models.Bug.MinDescriptionLength} characters long and at most {Models.Bug.MaxDescriptionLength} characters long.");

        public static Error NotFound => Error.NotFound( code: "Bug.Notfound", description: "Bug not found");
    }
}