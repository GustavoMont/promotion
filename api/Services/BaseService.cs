using System.Security.Claims;
using api.Exceptions;
using api.Models;

namespace api.Services;

public class BaseService
{
    private IHttpContextAccessor _httpContextAccessor;

    public BaseService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected int GetCurrentUserId()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var id = Convert.ToInt32(user?.FindFirst("id")?.Value);
        return id;
    }

    protected string? GetUserRole()
    {
        var user = _httpContextAccessor.HttpContext?.User;
        var role = user?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
        return role;
    }

    protected void IsOwnerOrAdmin(int ownerId)
    {
        var userRole = GetUserRole();
        var userId = GetCurrentUserId();
        if (userId != ownerId && userRole != RoleEnum.ADMIN.ToString())
        {
            throw new ForbiddenException();
        }
    }
}
