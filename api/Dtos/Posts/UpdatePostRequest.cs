using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Posts;

public class UpdatePostRequest
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
