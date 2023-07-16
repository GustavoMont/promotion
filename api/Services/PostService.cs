using api.Dtos.Posts;
using api.Exceptions;
using api.Models;
using api.Repositories;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class PostService : BaseService
{
    private readonly FileUploadService _fileUploadService;
    private readonly PostRepository _repository;

    public PostService(
        [FromServices] PostRepository repository,
        [FromServices] IHttpContextAccessor httpContextAccessor,
        [FromServices] FileUploadService fileUploadService
    )
        : base(httpContextAccessor)
    {
        _repository = repository;
        _fileUploadService = fileUploadService;
    }

    public async Task<PostResponse> CreateAsync(CreatePostRequest newPost)
    {
        var userId = GetCurrentUserId();
        var post = newPost.Adapt<Post>();
        post.UserId = userId;
        if (newPost.Image != null)
        {
            post.Image = await _fileUploadService.UploadAsync(newPost.Image, "post");
        }
        else
        {
            post.Image = _fileUploadService.GetDefaultImageUrl("post");
        }
        var createdPost = await _repository.CreateAsync(post);
        return createdPost.Adapt<PostResponse>();
    }

    private async Task<Post> GetPost(int id, bool tracking = true)
    {
        var post = await _repository.GetByIdAsync(id, tracking);
        if (post == null)
        {
            throw new NotFoundException("Post não encontrado");
        }
        return post;
    }

    public async Task<PostResponse> GetByIdAsync(int id)
    {
        var post = await GetPost(id);
        return post.Adapt<PostResponse>();
    }

    public async Task<List<PostResponse>> ListComplaintedPostsAsync(int min = 5)
    {
        var posts = await _repository.ListComplaintedPostsAsync(min);
        return posts.Adapt<List<PostResponse>>();
    }

    public async Task DeleteAsync(int id)
    {
        var post = await GetPost(id);
        var userId = GetCurrentUserId();
        var userRole = GetUserRole();
        if (post.UserId != userId && userRole != RoleEnum.ADMIN.ToString())
        {
            throw new ForbiddenException();
        }
        await _repository.DeleteAsync(post);
    }

    public async Task<List<PostResponse>> GetAllAsync(
        int? userId = null,
        int? cityId = null,
        string? orderBy = null
    )
    {
        var posts = await _repository.GetAllAsync(userId, cityId, orderBy);
        return posts.Adapt<List<PostResponse>>();
    }

    public async Task<PostResponse> UpdateAsync(int id, UpdatePostRequest body)
    {
        var post = await GetPost(id);
        if (post == null)
        {
            throw new NotFoundException("Post não encontrado");
        }
        IsOwnerOrAdmin(post.UserId);
        var image = post.Image;
        if (body.Image != null)
        {
            image = await _fileUploadService.UploadAsync(body.Image, "post");
        }
        post.Update();
        var updates = body.Adapt(post);
        updates.Image = image;
        await _repository.UpdateAsync();
        return await GetByIdAsync(id);
    }
}
