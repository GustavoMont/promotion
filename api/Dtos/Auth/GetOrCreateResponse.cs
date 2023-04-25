namespace api.Dtos.Auth;

public class GetOrCreateResponse
{
    public GetOrCreateResponse(int statusCode, string token)
    {
        StatusCode = statusCode;
        Response = new(token);
    }

    public int StatusCode { get; set; }
    public TokenResponse Response { get; set; }
}
