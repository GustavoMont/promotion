namespace api.Dtos.User;

public class UpdatePasswordRequest : CreatePassword
{
    public string? OldPassword { get; set; }
}
