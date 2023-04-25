namespace api.Dtos.Auth;

public class TokenResponse
{
    public TokenResponse(string token)
    {
        Access = token;
    }

    public string Access { get; set; }
}
