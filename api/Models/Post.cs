using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Post
{
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "varchar(150)")]
    public string Title { get; set; } = null!;

    [Required]
    public decimal OldPrice { get; set; }

    [Required]
    public decimal PromotionPrice { get; set; }

    [Required]
    [Column(TypeName = "longtext")]
    public string Description { get; set; } = null!;
    public int UserId { get; set; }
    public User? User { get; set; }

    public void Create()
    {
        CreatedAt = DateTime.Now;
        UpdatedAt = DateTime.Now;
    }

    public void Update()
    {
        UpdatedAt = DateTime.Now;
    }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Address Address { get; set; } = null!;
    public List<Complaint> Complaints { get; set; } = null!;
    public string Image { get; set; } = null!;
}
