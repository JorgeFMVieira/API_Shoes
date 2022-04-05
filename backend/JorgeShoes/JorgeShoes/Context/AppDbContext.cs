using JorgeShoes.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace JorgeShoes.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Product> Products { get; set; }

        public DbSet<UserModel> User { get; set; }

        public DbSet<ProductType> ProductTypes { get; set; }
    }
}
