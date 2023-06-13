using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Address
{
    [Required]
    public int Id { get; set; }

    [Column(TypeName = "varchar(150)")]
    public string? Street { get; set; }

    [Column(TypeName = "varchar(150)")]
    public string? Neighborhood { get; set; }

    [Column(TypeName = "varchar(10)")]
    public string? Number { get; set; }

    [Required]
    public int CityId { get; set; }
    public City? City { get; set; }
    public int PostId { get; set; }
    public Post? Post { get; set; }
}
