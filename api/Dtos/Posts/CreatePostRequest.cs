using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Posts;

public class CreatePostRequest
{
    [Required]
    [MinLength(5, ErrorMessage = "Título deve ter no mínimo {1} caracteres")]
    public string Title { get; set; } = null!;

    [Required]
    [MinLength(15, ErrorMessage = "Descrição deve ter no mínimo {1} caracteres")]
    public string Description { get; set; } = null!;

    [Required]
    public decimal? OldPrice { get; set; } = null!;

    [Required]
    public decimal? PromotionPrice { get; set; } = null!;
    public CreateAddress Address { get; set; } = null!;
    public IFormFile? Image { get; set; }
}

public class CreateAddress
{
    public string? Street { get; set; }
    public string? Neighborhood { get; set; }
    public int CityId { get; set; }
    public string? Number { get; set; }
}
