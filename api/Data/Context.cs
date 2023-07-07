using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class Context : DbContext
{
    //Construtor que vai receber configurações de acesso ao BD
    //Essas configurações virão do Program.cs
    public Context(DbContextOptions<Context> options)
        : base(options) { }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Post> Posts { get; set; } = null!;
    public DbSet<City> Cities { get; set; } = null!;
    public DbSet<Address> Addresses { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<Post>().Property(p => p.Image).HasDefaultValue("");
        modelBuilder.Entity<User>().Property(u => u.Role).HasDefaultValue(RoleEnum.USER);
        modelBuilder
            .Entity<User>()
            .Property(p => p.Role)
            .HasConversion(ut => ut.ToString(), ut => (RoleEnum)Enum.Parse(typeof(RoleEnum), ut));
        List<City> cities = new List<City>
        {
            new City { Id = 1, Name = "Pirapora" },
            new City { Id = 2, Name = "Buritizeiro" },
            new City { Id = 3, Name = "Varzea da Palma" }
        };
        modelBuilder.Entity<City>().HasData(cities);
    }
}
