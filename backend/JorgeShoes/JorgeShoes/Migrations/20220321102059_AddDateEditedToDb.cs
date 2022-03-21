using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JorgeShoes.Migrations
{
    public partial class AddDateEditedToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateEdited",
                table: "Products",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateEdited",
                table: "Products");
        }
    }
}
