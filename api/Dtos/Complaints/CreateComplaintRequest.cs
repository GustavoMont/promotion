using System.ComponentModel.DataAnnotations;
using api.Models;
using System.Text.Json.Serialization;

namespace api.Dtos.Complaints;

public class CreateComplaintRequest
{
    [Required(ErrorMessage = "É necessário informar o post")]
    public int? PostId { get; set; }

    [RequiredEnum(ErrorMessage = "Insira uma razão vpalida")]
    public ReasonEnum Reason { get; set; }
    public string? Explain { get; set; }
}
