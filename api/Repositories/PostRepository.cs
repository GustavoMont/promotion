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

    public async Task<Post?> GetByIdAsync(int id)
    {
        return await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Address.City)
            .Include(p => p.Complaints)
            .AsNoTracking()
            .FirstOrDefaultAsync(post => post.Id == id);
    }

    public async Task<List<Post>> GetAllAsync(int? userId = null)
    {
        return await _context.Posts
            .AsNoTracking()
            .Where(p => userId == null || p.UserId == userId)
            .OrderByDescending(post => post.Id)
            .Include(p => p.User)
            .Include(p => p.Address.City)
            .Include(p => p.Complaints)
            .ToListAsync();
    }
}
