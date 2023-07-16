using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class PostRepository
{
    private readonly Context _context;

    public PostRepository([FromServices] Context context)
    {
        _context = context;
    }

    public async Task<Post> CreateAsync(Post newPost)
    {
        newPost.Create();
        await _context.Posts.AddAsync(newPost);
        await _context.SaveChangesAsync();
        return newPost;
    }

    public async Task<Post?> GetByIdAsync(int id, bool tracking = true)
    {
        var action = _context.Posts
            .Include(p => p.User)
            .Include(p => p.Complaints)
            .Include(p => p.Address.City);
        return await (
            tracking
                ? action.FirstOrDefaultAsync(post => post.Id == id)
                : action.AsNoTracking().FirstOrDefaultAsync(post => post.Id == id)
        );
    }

    public async Task<List<Post>> ListComplaintedPostsAsync(int min = 5)
    {
        return await _context.Posts
            .AsNoTracking()
            .Where(p => p.Complaints.Count >= min)
            .OrderByDescending(p => p.Complaints.Count)
            .Include(p => p.Complaints)
            .Include(p => p.User)
            .Include(p => p.Address.City)
            .ToListAsync();
    }

    public async Task<List<Post>> GetAllAsync(
        int? userId = null,
        int? cityId = null,
        string? orderBy = null
    )
    {
        return await _context.Posts
            .AsNoTracking()
            .OrderBy(p => orderBy == "less_complaints" ? p.Complaints.Count : 0)
            .ThenByDescending(post => post.Id)
            .Include(p => p.Complaints)
            .Include(p => p.User)
            .Include(p => p.Address.City)
            .Where(p => userId == null || p.UserId == userId)
            .Where(p => cityId == null || p.Address.CityId == cityId)
            .ToListAsync();
    }

    public async Task DeleteAsync(Post post)
    {
        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync()
    {
        await _context.SaveChangesAsync();
    }
}
