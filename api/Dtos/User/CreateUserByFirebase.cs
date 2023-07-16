using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User;

public class CreateUserByFirebase
{
    [Required(ErrorMessage = "Email é um campo obrigatório")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Nome é um campo obrigatório")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Sobrenome é um campo obrigatório")]
    public string LastName { get; set; } = null!;

    public string? Avatar { get; set; }
}
