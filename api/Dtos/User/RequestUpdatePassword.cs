using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User;

public class RequestUpdatePassword
{
    [MinLength(8, ErrorMessage = "A senha deve ter o mínimo {1} caracteres")]
    [RegularExpression(
        "^(?=.*[A-Za-z])(?=.*?[0-9]).{8,}$",
        ErrorMessage = "A senha deve ter no mínimo uma letra e um número"
    )]
    [Required(ErrorMessage = "Senha é um campo obrigatório")]
    public string? CurrentPassword { get; set; }
    public string? NewPassword { get; set; }
}
