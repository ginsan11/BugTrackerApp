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
    public ErrorOr<Created> CreateBug(Bug bug){
        bugdict[bug.Id] = bug;

    return Result.Created;
}
//DEMO ID  = > 6b5ebd61-9014-4e20-bb8e-244e1b7420cd
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
                        // Extract the bug data from the reader
                        Bug bug = new Bug(
                            Id = reader.GetGuid(0),
                            Name = reader.GetString(1),
                            Description = reader.GetString(2),
                            Creator = reader.GetString(3),
                            Collaborators = reader.GetString(4).Split(','),
                            StartDateTime = reader.GetDateTime(5),
                            EndDateTime = reader.IsDBNull(6) ? null : (DateTime?)reader.GetDateTime(6),
                            LastModified = reader.GetDateTime(7),
                            Status = reader.GetInt32(8)
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

