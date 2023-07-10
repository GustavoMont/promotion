using api.Models;

namespace api.Dtos.User;

public class CreateTeamUserRequest : CreateUser
{
    public RoleEnum Role { get; set; }
}
