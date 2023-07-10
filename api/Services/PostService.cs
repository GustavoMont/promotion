using api.Dtos.Posts;
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

    public async Task<PostResponse> GetByIdAsync(int id)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null)
        {
            throw new Exception("Post não encontrado");
        }
        return post.Adapt<PostResponse>();
    }

    public async Task<List<PostResponse>> GetAllAsync(int? userId = null)
    {
        var posts = await _repository.GetAllAsync(userId);
        return posts.Adapt<List<PostResponse>>();
    }
}
