namespace api.Dtos.User;

public class UpdateUserRequest
{
    public string Name { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public IFormFile? Avatar { get; set; }
}
