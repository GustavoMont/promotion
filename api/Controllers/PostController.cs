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
    [HttpPost]
    public async Task<ActionResult<PostResponse>> CreateAsync([FromBody] CreatePostRequest newPost)
    {
        try
        {
            var post = await _service.CreateAsync(newPost);
            return CreatedAtAction(nameof(GetByIdAsync), new { id = post.Id }, post);
        }
        catch (System.Exception error)
        {
            return BadRequest(new { message = error.Message });
        }
    }

    [HttpGet("{id:int}")]
    [ActionName(nameof(GetByIdAsync))]
    public async Task<ActionResult<PostResponse>> GetByIdAsync([FromRoute] int id)
    {
        try
        {
            return Ok(await _service.GetByIdAsync(id));
        }
        catch (System.Exception error)
        {
            return NotFound(new { message = error.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<PostResponse>>> GetAllAsync([FromQuery] int? userId)
    {
        try
        {
            return Ok(await _service.GetAllAsync(userId));
        }
        catch (System.Exception error)
        {
            return BadRequest(new { message = error.Message });
        }
    }

    [HttpGet("complaints")]
    [Authorize]
    public async Task<ActionResult<List<PostResponse>>> ListComplaintedPostsAsync(
        [FromQuery] int min = 5
    )
    {
        try
        {
            return Ok(await _service.ListComplaintedPostsAsync(min));
        }
        catch (System.Exception error)
        {
            return BadRequest(new { message = error.Message });
        }
    }
}
