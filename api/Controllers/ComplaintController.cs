using api.Dtos.Complaints;
using api.Exceptions;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/complaints")]
public class ComplaintController : ControllerBase
{
    private readonly ComplaintService _service;

    public ComplaintController([FromServices] ComplaintService complaintService)
    {
        _service = complaintService;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> CreateAsync([FromBody] CreateComplaintRequest body)
    {
        try
        {
            var complaint = await _service.CreateAsync(body);
            return CreatedAtAction(nameof(GetByIdAsync), new { id = complaint.Id }, complaint);
        }
        catch (BadHttpRequestException err)
        {
            return BadRequest(new { message = err.Message });
        }
        catch (Exception err)
        {
            return BadRequest(new { message = err.Message });
        }
    }

    [HttpGet("reason-types")]
    [Authorize]
    public ActionResult<List<ReasonTypeResponse>> ListReasonTypes()
    {
        return Ok(_service.ListReasonTypes());
    }

    [HttpGet("{id:int}")]
    [ActionName(nameof(GetByIdAsync))]
    public async Task<ActionResult<ComplaintResponse>> GetByIdAsync([FromRoute] int id)
    {
        try
        {
            return Ok(await _service.GetByIdAsync(id));
        }
        catch (System.Exception err)
        {
            return BadRequest(new { message = err.Message });
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
        catch (ForbiddenException)
        {
            return Forbid();
        }
        catch (NotFoundException err)
        {
            return NotFound(new { message = err.Message });
        }
    }
}
