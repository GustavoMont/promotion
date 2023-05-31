namespace api.Dtos.User;

public class UserResponse
{
    public string Name { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Avatar { get; set; }
}
