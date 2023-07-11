using api.Dtos.Complaints;
using api.Exceptions;
using api.Models;
using api.Repositories;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class ComplaintService : BaseService
{
    private readonly ComplaintRepository _repository;
    private readonly PostService _postService;

    public ComplaintService(
        [FromServices] ComplaintRepository repository,
        [FromServices] PostService postService,
        [FromServices] IHttpContextAccessor httpContextAccessor
    )
        : base(httpContextAccessor)
    {
        _repository = repository;
        _postService = postService;
    }

    public async Task<ComplaintResponse> CreateAsync(CreateComplaintRequest body)
    {
        var userId = GetCurrentUserId();
        if (body.PostId != null)
        {
            var post = await _postService.GetByIdAsync((int)body.PostId);
        }
        var existComplaint = await _repository.GetUserPostComplaintAsync(userId, body.PostId);
        if (existComplaint != null)
        {
            throw new BadHttpRequestException("Você já denunciou este post");
        }
        var newComplaint = body.Adapt<Complaint>();
        newComplaint.UserId = userId;
        var createdComplaint = await _repository.CreateAsync(newComplaint);
        return createdComplaint.Adapt<ComplaintResponse>();
    }

    public List<ReasonTypeResponse> ListReasonTypes()
    {
        List<ReasonTypeResponse> reasons = new List<ReasonTypeResponse>
        {
            new ReasonTypeResponse
            {
                Name = "Nudez ou conetúdo pornográfico",
                Reason = ReasonEnum.ADULT_CONTENT
            },
            new ReasonTypeResponse { Name = "Anuncio falso", Reason = ReasonEnum.FAKE_PROMOTION },
            new ReasonTypeResponse { Name = "Golpe/Fraude", Reason = ReasonEnum.FRAUD },
            new ReasonTypeResponse { Name = "Outro", Reason = ReasonEnum.OTHER },
        };
        return reasons;
    }

    private async Task<Complaint> GetComplaintAsync(int id, bool tracking = false)
    {
        var complaint = await _repository.GetByIdAsync(id);
        if (complaint == null)
        {
            throw new NotFoundException("Denúncia não encontrada");
        }

        return complaint;
    }

    public async Task DeleteAsync(int id)
    {
        var complaint = await GetComplaintAsync(id, true);
        IsOwnerOrAdmin(complaint.UserId);
        await _repository.DeleteAsync(complaint);
    }

    public async Task<ComplaintResponse> GetByIdAsync(int id)
    {
        var complaint = await GetComplaintAsync(id);

        return complaint.Adapt<ComplaintResponse>();
    }
}
