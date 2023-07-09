using api.Dtos.Posts;
using api.Models;
using api.Repositories;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class PostService : BaseService
{
    private readonly PostRepository _repository;

    public PostService(
        [FromServices] PostRepository repository,
        [FromServices] IHttpContextAccessor httpContextAccessor
    )
        : base(httpContextAccessor)
    {
        _repository = repository;
    }

    public async Task<PostResponse> CreateAsync(CreatePostRequest newPost)
    {
        var userId = GetCurrentUserId();
        var post = newPost.Adapt<Post>();
        post.UserId = userId;
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

    public async Task<List<PostResponse>> ListComplaintedPostsAsync(int min = 5)
    {
        var posts = await _repository.ListComplaintedPostsAsync(min);
        return posts.Adapt<List<PostResponse>>();
    }

    public async Task<List<PostResponse>> GetAllAsync()
    {
        var posts = await _repository.GetAllAsync();
        return posts.Adapt<List<PostResponse>>();
    }
}
