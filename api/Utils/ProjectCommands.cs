using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Utils;

public class ProjectCommands
{
    private readonly IHost _app;

    public ProjectCommands(IHost app)
    {
        _app = app;
    }

    public void RunCommand(string command)
    {
        switch (command)
        {
            case "seed":
                SeedData();
                break;
            default:
                System.Console.WriteLine("!!!! Comando não encontrado !!!!");
                break;
        }
    }

    private void SeedData()
    {
        var scopeFactory = _app.Services.GetService<IServiceScopeFactory>();

        using (var scope = scopeFactory?.CreateScope())
        {
            var seeder = scope?.ServiceProvider.GetService<DataSeeder>();
            if (seeder != null)
            {
                seeder.Seed();
            }
            else
            {
                throw new Exception("Ocorreu um erro ao executar o comando");
            }
        }
    }
}
