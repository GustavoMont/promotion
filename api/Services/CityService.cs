using api.Dtos.City;
using api.Repositories;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class CityService
{
    private readonly CityRepository _repository;

    public CityService([FromServices] CityRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CityResponse>> GetAllAsync()
    {
        var cities = await _repository.GetAllAsync();
        return cities.Adapt<List<CityResponse>>();
    }
}
