using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Auth;

public class LoginRequest
{
    [Required(ErrorMessage = "E-mail é um campo obrigatório")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Senha é um campo obrigatório")]
    public string Password { get; set; } = null!;
}
