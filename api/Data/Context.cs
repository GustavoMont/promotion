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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(p => p.Role).HasDefaultValue(RoleEnum.USER);
        modelBuilder
            .Entity<User>()
            .Property(p => p.Role)
            .HasConversion(ut => ut.ToString(), ut => (RoleEnum)Enum.Parse(typeof(RoleEnum), ut));
    }
}
