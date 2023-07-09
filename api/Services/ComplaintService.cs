using api.Dtos.Complaints;
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

    public async Task<ComplaintResponse> GetByIdAsync(int id)
    {
        var complaint = await _repository.GetByIdAsync(id);
        if (complaint == null)
        {
            throw new Exception("Reclamação não encontrada");
        }
        return complaint.Adapt<ComplaintResponse>();
    }
}
