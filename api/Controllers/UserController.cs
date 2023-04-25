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

    [HttpPost]
    public async Task<ActionResult<TokenResponse>> CreateAsync([FromBody] CreateUser body)
    {
        try
        {
            return StatusCode(201, await _service.CreateAsync(body));
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
}
