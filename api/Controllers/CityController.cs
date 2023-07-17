using api.Dtos.City;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/cities")]
public class CityController : ControllerBase
{
    private readonly CityService _service;

    public CityController([FromServices] CityService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<CityResponse>>> GetAllAsync()
    {
        return Ok(await _service.GetAllAsync());
    }
}
