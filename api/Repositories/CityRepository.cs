using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CityRepository
{
    private readonly Context _context;

    public CityRepository([FromServices] Context context)
    {
        _context = context;
    }

    public async Task<List<City>> GetAllAsync()
    {
        return await _context.Cities.ToListAsync();
    }
}
