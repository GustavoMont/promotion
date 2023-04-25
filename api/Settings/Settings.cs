namespace api.Settings;

public static class Settings
{
    public static string GetJwtKey()
    {
        var jwtKey = System.Environment.GetEnvironmentVariable("JWT_KEY");
        if (jwtKey is null)
        {
            throw new Exception("Não foi possível achar a chave de codificação jwt");
        }
        return jwtKey;
    }
}
