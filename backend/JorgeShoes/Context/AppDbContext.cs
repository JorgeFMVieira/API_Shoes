using JorgeShoes.Models;
using Microsoft.EntityFrameworkCore;

namespace JorgeShoes.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
    }
}
