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
}
