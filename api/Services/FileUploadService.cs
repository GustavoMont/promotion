using Firebase.Auth;
using Firebase.Auth.Providers;
using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class FileUploadService
{
    private FirebaseAuthClient _client;

    public FileUploadService([FromServices] FirebaseAuthClient client)
    {
        _client = client;
        FirebaseAuthConfig config = new FirebaseAuthConfig
        {
            ApiKey = "api_key",
            AuthDomain = "",
            Providers = new FirebaseAuthProvider[] { new EmailProvider() }
        };
        var auth = new FirebaseAuthClient(config);
    }
}
