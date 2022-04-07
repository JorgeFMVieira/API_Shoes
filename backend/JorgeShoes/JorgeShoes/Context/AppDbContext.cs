using JorgeShoes.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace JorgeShoes.Context
{
    public class AppDbContext : IdentityDbContext<ApplicationUser, ApplicationRoles, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);

            Builder.Entity<ApplicationUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Roles)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            Builder.Entity<ProductType>(t =>
            {
                t.HasKey(t => t.ProductTypeId);

            });

            Builder.Entity<Product>(t =>
            {
                t.HasKey(t => t.Id);
                t.HasOne(t => t.Type)
                .WithMany(t => t.Products)
                .HasForeignKey(t => t.ProductTypeId);
            });
        }

        public DbSet<Product> Products { get; set; }

        public virtual DbSet<ApplicationUserRole> ApplicationUserRoles { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<ApplicationRoles> ApplicationRoles { get; set; }

        public DbSet<ProductType> ProductTypes { get; set; }
    }
}
