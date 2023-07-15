using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserRepository
{
    private readonly Context _context;

    public UserRepository([FromServices] Context context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User> CreateAsync(User newUser)
    {
        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();
        return newUser;
    }

    public async Task<User?> GetById(int id, bool tracking = true)
    {
        var userDb = _context.Users;
        return await (
            tracking
                ? userDb.FirstOrDefaultAsync(user => user.Id == id)
                : userDb.AsNoTracking().FirstOrDefaultAsync(user => user.Id == id)
        );
    }

    public async Task<List<User>> ListAsync(int? role)
    {
        return await _context.Users
            .AsNoTracking()
            .Where(u => role != null ? (int?)u.Role == role : true)
            .ToListAsync();
    }

    public async Task DeleteAsync(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync()
    {
        await _context.SaveChangesAsync();
    }
}
