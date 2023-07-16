using api.Models;

namespace api.Data.Seeders;

public static class UsersSeeds
{
    public static List<User> LoadUsers()
    {
        List<User> users = new List<User>
        {
            new User
            {
                Id = 2,
                Email = "user1@email.com",
                Name = "Rodney",
                LastName = "Lataria",
                Password = "12345678S"
            },
            new User
            {
                Id = 3,
                Email = "user2@email.com",
                Name = "Tia Turbina",
                LastName = "Foster",
                Password = "12345678S"
            },
            new User
            {
                Id = 4,
                Email = "user3@email.com",
                Name = "Manivela",
                LastName = "Souza",
                Password = "12345678S",
            },
            new User
            {
                Id = 5,
                Email = "user4@email.com",
                Name = "Grande Soldador",
                LastName = "Oliveira",
                Password = "12345678S"
            },
            new User
            {
                Id = 6,
                Email = "user5@email.com",
                Name = "Piper",
                LastName = "Souza",
                Password = "12345678S"
            }
        };
        return users;
    }
}
