using BugTracker.Models;
using ErrorOr;
using BugTracker.ServiceErrors;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace BugTracker.Services.Bugs;

public class BugService : IBugService{
    private readonly string connectionString;

    private static readonly Dictionary<Guid, Bug> bugdict = new();

    public BugService(IConfiguration configuration){
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

    public List<string> ConvertTXTToStringList(string collaborators){
        string[] collaboratorsArray = collaborators.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        List<string> collaboratorsList = new List<string>(collaboratorsArray);
        return collaboratorsList;
    }

    public List<Guid> ConvertTXTToGuidList(string guidString){
    string[] guidParts = guidString.Split(',');

    List<Guid> guidList = new List<Guid>();

    foreach (string guidPart in guidParts)
    {
        if (Guid.TryParse(guidPart, out Guid guid))
        {
            guidList.Add(guid);
        }
        else
        {
            // Handle invalid GUID format
            // You can throw an exception, log an error, or take appropriate action
        }
    }

    return guidList;
}

    public ErrorOr<Created> CreateBug(Bug bug){
        bugdict[bug.Id] = bug;

    return Result.Created;
}
    public ErrorOr<Bug> GetBug(Guid id){
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            // Construct the SQL query
            string query = "SELECT * FROM Bug WHERE id = @Id";
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                // Add the ID parameter to the query
                command.Parameters.AddWithValue("@Id", id);
                // Execute the query and retrieve the bug data
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        List<string> collaborators = ConvertTXTToStringList(reader.GetString(reader.GetOrdinal("collaborators")));
                        List<Guid> guidList2 = ConvertTXTToGuidList(reader.GetString(reader.GetOrdinal("linkedbugs")));
                        List<Guid> guidList = new List<Guid>();
                        // Extract the bug data from the reader
                        ErrorOr<Bug> bug = Bug.Create(  
                            reader.GetString(reader.GetOrdinal("name")),
                            reader.GetString(reader.GetOrdinal("description")),
                           reader.GetString(reader.GetOrdinal("creator")),
                            collaborators,
                            reader.GetDateTime(reader.GetOrdinal("startDateTime")),
                            reader.GetDateTime(reader.GetOrdinal("endDateTime")),
                            reader.GetInt32(reader.GetOrdinal("status")),
                            guidList2,
                            reader.GetDateTime(reader.GetOrdinal("lastModified")),
                            Guid.Parse(reader.GetString(reader.GetOrdinal("id")))
                        );
                        connection.Close();
                        return bug;
                    }
                }
                connection.Close();
                return Errors.Bug.NotFound;
            }
            
        }
    }

public ErrorOr<List<Bug>> GetMyBugs(String myname)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        // Construct the SQL query
        string query = "SELECT * FROM Bug WHERE collaborators LIKE @Collaborator";
        using (SqlCommand command = new SqlCommand(query, connection))
        {
            // Add the collaborator parameter to the query
            command.Parameters.AddWithValue("@Collaborator", "%" + myname + "%");
            // Execute the query and retrieve the bug data
            using (SqlDataReader reader = command.ExecuteReader())
            {
                List<Bug> bugs = new List<Bug>();

                while (reader.Read())
                {
                    List<string> collaborators = ConvertTXTToStringList(reader.GetString(reader.GetOrdinal("collaborators")));
                    List<Guid> guidList = ConvertTXTToGuidList(reader.GetString(reader.GetOrdinal("linkedbugs")));
                    // Extract the bug data from the reader
                    ErrorOr<Bug> bug = Bug.Create(
                        reader.GetString(reader.GetOrdinal("name")),
                        reader.GetString(reader.GetOrdinal("description")),
                        reader.GetString(reader.GetOrdinal("creator")),
                        collaborators,
                        reader.GetDateTime(reader.GetOrdinal("startDateTime")),
                        reader.GetDateTime(reader.GetOrdinal("endDateTime")),
                        reader.GetInt32(reader.GetOrdinal("status")),
                        guidList,
                        reader.GetDateTime(reader.GetOrdinal("lastModified")),
                        Guid.Parse(reader.GetString(reader.GetOrdinal("id")))
                    );

                    if (!bug.IsError)
                    {// Check if any collaborator name matches myname
                        if (collaborators.Contains(myname) | collaborators.Contains(" "+myname))
                        {
                            bugs.Add(bug.Value);
                        }
                    }
                    else
                    {
                        // Handle the error if necessary
                    }
                }

                connection.Close();
                return bugs;
            }
        }
    }
}

    public ErrorOr<UpsertedBug> UpsertBug(Bug bug){
        var IsNewlyCreated = !bugdict.ContainsKey(bug.Id); //if the bug dict doesnt contain the id then create a new one
        bugdict[bug.Id] = bug;
        return new UpsertedBug(IsNewlyCreated);

    }

    public ErrorOr<Deleted> DeletetBug(Guid id){
        if(bugdict.TryGetValue(id, out var bug)){
            bugdict.Remove(id);
            return Result.Deleted;
        }
        return Errors.Bug.NotFound;
    }
}

