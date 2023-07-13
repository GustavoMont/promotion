using api.Models;

namespace api.Dtos.Complaints;

public class ReasonTypeResponse
{
    public ReasonEnum Reason { get; set; }
    public string Name { get; set; } = null!;
}
