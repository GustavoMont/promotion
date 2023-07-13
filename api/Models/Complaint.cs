using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Complaint
{
    public int Id { get; set; }
    public User User { get; set; } = null!;

    [Required]
    public int UserId { get; set; }
    public Post Post { get; set; } = null!;

    [Required]
    public int PostId { get; set; }

    [Required]
    [Column(TypeName = "varchar(40)")]
    public ReasonEnum Reason { get; set; }

    [Column(TypeName = "varchar(255)")]
    public string? Explain { get; set; }
}
