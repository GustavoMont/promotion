using api.Data.Seeders;
using api.Models;
using api.Services;

namespace api.Data;

public class DataSeeder
{
    private readonly Context _context;
    private readonly FileUploadService _fileUploadService;

    public DataSeeder(Context context, FileUploadService fileUploadService)
    {
        _context = context;
        _fileUploadService = fileUploadService;
    }

    public void SeedPosts()
    {
        try
        {
            if (!_context.Posts.Any())
            {
                _context.Posts.AddRange(
                    PostsSeeds.LoadPosts(_fileUploadService.GetDefaultImageUrl("post"))
                );
                _context.SaveChanges();

                System.Console.WriteLine("!=========================");
                System.Console.WriteLine("Posts carregados com sucesso!");
                System.Console.WriteLine("==========================");
            }
            else
            {
                throw new Exception("Seu banco de dados já está com os dados!");
            }
        }
        catch (System.Exception err)
        {
            System.Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.Console.WriteLine(err.Message);
            System.Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }

    public void SeedUsers()
    {
        try
        {
            if (_context.Users.Count() <= 1)
            {
                _context.Users.AddRange(UsersSeeds.LoadUsers());
                _context.SaveChanges();

                System.Console.WriteLine("==========================");
                System.Console.WriteLine("Usuários carregados com sucesso!");
                System.Console.WriteLine("==========================");
            }
            else
            {
                throw new Exception("Seu banco de dados já está com os dados!");
            }
        }
        catch (System.Exception err)
        {
            System.Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!");
            System.Console.WriteLine(err.Message);
            System.Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }

    public void Seed()
    {
        SeedUsers();
        SeedPosts();
    }
}
