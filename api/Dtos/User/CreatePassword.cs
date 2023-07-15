using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User;

public class CreatePassword
{
    [MinLength(8, ErrorMessage = "A senha deve ter o mínimo {1} caracteres")]
    [RegularExpression(
        "^(?=.*[A-Za-z])(?=.*?[0-9]).{8,}$",
        ErrorMessage = "A senha deve ter no mínimo uma letra e um número"
    )]
    [Required(ErrorMessage = "Senha é um campo obrigatório")]
    public string Password { get; set; } = null!;
    public string? ConfirmPassword { get; set; }
}
