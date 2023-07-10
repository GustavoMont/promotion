using api.Dtos.City;
using api.Dtos.User;

namespace api.Dtos.Posts;

public class PostResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public AddressResponse? Address { get; set; }
    public decimal OldPrice { get; set; }
    public decimal PromotionPrice { get; set; }
    public int UserId { get; set; }
    public UserResponse? User { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string Image { get; set; } = null!;
}

public class AddressResponse
{
    public int Id { get; set; }

    public string? Street { get; set; }

    public string? Neighborhood { get; set; }

    public string? Number { get; set; }

    public int CityId { get; set; }
    public CityResponse? City { get; set; }
}
