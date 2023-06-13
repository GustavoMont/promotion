using api.Dtos.Posts;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/posts")]
public class PostController : ControllerBase
{
    private readonly PostService _service;

    public PostController([FromServices] PostService service)
    {
        _service = service;
    }

    [Authorize]
    public async Task<ActionResult<PostResponse>> CreateAsync([FromBody] CreatePostRequest newPost)
    {
        try
        {
            return StatusCode(201, await _service.CreateAsync(newPost));
        }
        catch (System.Exception error)
        {
            return BadRequest(new { message = error.Message });
        }
    }
}
