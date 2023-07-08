using Microsoft.AspNetCore.Mvc;

namespace api.Services;

public class FileUploadService
{
    private readonly IWebHostEnvironment _enviroment;
    private readonly IConfiguration _configuration;
    private readonly string _imagePath = "wwwroot/images";

    public FileUploadService(
        [FromServices] IWebHostEnvironment environment,
        [FromServices] IConfiguration configuration
    )
    {
        _enviroment = environment;
        _configuration = configuration;
    }

    public string GetDefaultImageUrl(string enitityName)
    {
        var filePath = $"{_imagePath}/{enitityName}/default_image.png";
        return $"{GetUrl()}/{FilePathToUrl(filePath)}";
    }

    public static void LoadDefaultImage()
    {
        string defaultImagesPath = "Constants/default-images";
        List<string> entities = new List<string> { "post" };
        entities.ForEach(entity =>
        {
            var fullPath = defaultImagesPath + $"/{entity}_default_image.png";
            var targetFolder = $"wwwroot/images/{entity}";
            if (!Directory.Exists(targetFolder))
            {
                Directory.CreateDirectory(targetFolder);
            }
            File.Copy(fullPath, targetFolder + "/default_image.png");
        });
    }

    private string FilePathToUrl(string filePath)
    {
        return filePath.Replace("wwwroot", "public");
    }

    private string GetUrl()
    {
        var url = _enviroment.IsDevelopment()
            ? _configuration["ApiUrl_local"]
            : _configuration["ApiUrl_Prod"];
        return url == null ? "" : url;
    }

    public async Task<string> UploadAsync(IFormFile file, string entityName)
    {
        var fileName = $"{Guid.NewGuid().ToString()}_{file.FileName}";
        var folderPath = $"{_imagePath}/{entityName}";
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
        var filePath = Path.Combine(folderPath, fileName.Replace(" ", "_"));
        using (var stream = System.IO.File.Create(filePath))
        {
            await file.CopyToAsync(stream);
        }

        return $"{GetUrl()}/{FilePathToUrl(filePath)}";
    }
}
