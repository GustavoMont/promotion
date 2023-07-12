using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User;

public class RequestUpdatePassword
{
    public string CurrentPassword { get; set; } = null!;

    [MinLength(8, ErrorMessage = "A senha deve ter o mínimo {1} caracteres")]
    [RegularExpression(
        "^(?=.*[A-Za-z])(?=.*?[0-9]).{8,}$",
        ErrorMessage = "A senha deve ter no mínimo uma letra e um número"
    )]
    public string NewPassword { get; set; } = null!;

    [Required]
    public string ConfirmPassword { get; set; } = null!;
}
