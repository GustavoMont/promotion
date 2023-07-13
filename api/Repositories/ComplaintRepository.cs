using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ComplaintRepository
{
    private readonly Context _context;

    public ComplaintRepository([FromServices] Context context)
    {
        _context = context;
    }

    public async Task<Complaint?> GetUserPostComplaintAsync(int userId, int? postId)
    {
        var complaint = await _context.Complaints
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.UserId == userId && c.PostId == postId);
        return complaint;
    }

    public async Task<Complaint?> GetByIdAsync(int id, bool tracking = false)
    {
        var action = _context.Complaints.Include(c => c.User);
        return await (
            tracking
                ? action.FirstOrDefaultAsync()
                : (action.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id))
        );
    }

    public async Task DeleteAsync(Complaint complaint)
    {
        _context.Complaints.Remove(complaint);
        await _context.SaveChangesAsync();
    }

    public async Task<Complaint> CreateAsync(Complaint newComplaint)
    {
        await _context.Complaints.AddAsync(newComplaint);
        await _context.SaveChangesAsync();
        return newComplaint;
    }
}
