using Microsoft.EntityFrameworkCore.Migrations;

namespace JorgeShoes.Migrations
{
    public partial class AddForeignKeyProductType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductTypes",
                newName: "ProductTypeID");

            migrationBuilder.AddColumn<string>(
                name: "ProductTypeID",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductTypeID1",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductTypeID1",
                table: "Products",
                column: "ProductTypeID1");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID1",
                table: "Products",
                column: "ProductTypeID1",
                principalTable: "ProductTypes",
                principalColumn: "ProductTypeID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID1",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductTypeID1",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductTypeID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductTypeID1",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductTypeID",
                table: "ProductTypes",
                newName: "Id");
        }
    }
}
