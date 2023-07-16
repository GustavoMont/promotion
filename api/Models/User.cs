using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    public int Id { get; set; }

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
    [Required]
    private string? _password;
    public string? Password
    {
        get { return _password; }
        set { _password = BCrypt.Net.BCrypt.HashPassword(value); }
    }

    [Required]
    [Column(TypeName = "varchar(15)")]
    public RoleEnum Role { get; set; }

    [Column(TypeName = "varchar(255)")]
    public string? Avatar { get; set; }
    public List<Post> Posts { get; set; } = null!;
}
