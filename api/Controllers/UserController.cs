using api.Dtos.Auth;
using api.Dtos.User;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserService _service;

    public UserController([FromServices] UserService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponse>> LoginAsync([FromBody] LoginRequest body)
    {
        try
        {
            return Ok(await _service.LoginAsync(body));
        }
        catch (BadHttpRequestException err)
        {
            return BadRequest(new { message = err.Message });
        }
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<UserResponse>> Me()
    {
        try
        {
            return Ok(await _service.GetMe());
        }
        catch (Exception error)
        {
            return BadRequest(new { message = error.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<TokenResponse>> CreateAsync([FromBody] CreateUser body)
    {
        try
        {
            return StatusCode(201, await _service.CreateAuthAsync(body));
        }
        catch (BadHttpRequestException err)
        {
            return BadRequest(new { message = err.Message });
        }
    }

    [HttpPost("external")]
    [Authorize(AuthenticationSchemes = "Firebase")]
    public async Task<ActionResult<TokenResponse>> GetOrCreateAsync(
        [FromBody] CreateUserByFirebase body
    )
    {
        try
        {
            var result = await _service.GetOrCreateAsync(body);
            return StatusCode(result.StatusCode, result.Response);
        }
        catch (System.Exception err)
        {
            return BadRequest(new { message = err.Message });
        }
    }

    [HttpPost("team")]
    [Authorize(Roles = "ADMIN")]
    public async Task<ActionResult<UserResponse>> CreateTeamUserAsync(
        [FromBody] CreateTeamUserRequest body
    )
    {
        try
        {
            return StatusCode(201, await _service.CreateTeamUserAsync(body));
        }
        catch (System.Exception err)
        {
            return BadRequest(new { message = err.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<UserResponse>>> ListAsync([FromQuery] int? role)
    {
        try
        {
            return await _service.ListAsync(role);
        }
        catch (System.Exception err)
        {
            return BadRequest(new { message = err.Message });
        }
    }
}
