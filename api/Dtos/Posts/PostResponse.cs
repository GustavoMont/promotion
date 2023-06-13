using api.Dtos.User;
using api.Models;

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
}

public class AddressResponse
{
    public int Id { get; set; }

    public string? Street { get; set; }

    public string? Neighborhood { get; set; }

    public string? Number { get; set; }

    public int CityId { get; set; }
    public City? City { get; set; }
}
