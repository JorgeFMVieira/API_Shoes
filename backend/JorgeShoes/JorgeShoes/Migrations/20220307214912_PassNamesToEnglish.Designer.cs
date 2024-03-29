﻿// <auto-generated />
using JorgeShoes.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace JorgeShoes.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220307214912_PassNamesToEnglish")]
    partial class PassNamesToEnglish
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.14")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JorgeShoes.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Desicrição Jordan Paris",
                            Name = "Air Jordan 1 Mid Paris",
                            Price = 13
                        },
                        new
                        {
                            Id = 2,
                            Description = "Descrição de Lebron 19",
                            Name = "LeBron 19",
                            Price = 20
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
