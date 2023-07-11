namespace api.Dtos.User;

public class UserResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Avatar { get; set; }
}
