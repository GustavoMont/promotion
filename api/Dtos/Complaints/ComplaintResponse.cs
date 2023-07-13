using api.Dtos.User;
using api.Models;

namespace api.Dtos.Complaints;

public class ComplaintResponse
{
    public int Id { get; set; }

    public int PostId { get; set; }

    public int UserId { get; set; }

    public UserResponse User { get; set; } = null!;

    public ReasonEnum Reason { get; set; }
}
