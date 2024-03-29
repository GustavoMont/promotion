using api.Dtos.Posts;
using api.Exceptions;
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
    public async Task<ActionResult<PostResponse>> CreateAsync([FromForm] CreatePostRequest newPost)
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
    public async Task<ActionResult<List<PostResponse>>> GetAllAsync(
        [FromQuery] int? userId,
        [FromQuery] int? city,
        [FromQuery] string? orderBy
    )
    {
        try
        {
            return Ok(await _service.GetAllAsync(userId, city, orderBy));
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

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<PostResponse>> UpdateAsync(
        [FromRoute] int id,
        [FromForm] UpdatePostRequest body
    )
    {
        try
        {
            return Ok(await _service.UpdateAsync(id, body));
        }
        catch (NotFoundException err)
        {
            return NotFound(new { message = err.Message });
        }
        catch (ForbiddenException)
        {
            return Forbid();
        }
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<ActionResult> DeleteAsync([FromRoute] int id)
    {
        try
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
        catch (NotFoundException err)
        {
            return NotFound(new { message = err.Message });
        }
        catch (ForbiddenException)
        {
            return Forbid();
        }
    }
}
