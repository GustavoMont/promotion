using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class City
{
    public int Id { get; set; }

    [Column(TypeName = "varchar(150)")]
    public string Name { get; set; } = null!;
}
