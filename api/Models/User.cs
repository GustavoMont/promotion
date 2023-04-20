using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class User
{
    [Required]
    [Column(TypeName = "varchar(255)")]
    public string Email { get; set; } = null!;

    [Required]
    [Column(TypeName = "varchar(80)")]
    public string Name { get; set; } = null!;

    [Required]
    [Column(TypeName = "varchar(80)")]
    public string LastName { get; set; } = null!;

    [Column(TypeName = "varchar(255)")]
    public string? Password { get; set; }

    [Required]
    [Column(TypeName = "varchar(15)")]
    public RoleEnum Role { get; set; }
    public string? Avatar { get; set; }
}
