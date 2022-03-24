using Microsoft.EntityFrameworkCore.Migrations;

namespace JorgeShoes.Migrations
{
    public partial class UpdateMaiscula : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductTypeID",
                table: "ProductTypes",
                newName: "ProductTypeId");

            migrationBuilder.RenameColumn(
                name: "ProductTypeID",
                table: "Products",
                newName: "ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductTypeID",
                table: "Products",
                newName: "IX_Products_ProductTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products",
                column: "ProductTypeId",
                principalTable: "ProductTypes",
                principalColumn: "ProductTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "ProductTypes",
                newName: "ProductTypeID");

            migrationBuilder.RenameColumn(
                name: "ProductTypeId",
                table: "Products",
                newName: "ProductTypeID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductTypeId",
                table: "Products",
                newName: "IX_Products_ProductTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID",
                table: "Products",
                column: "ProductTypeID",
                principalTable: "ProductTypes",
                principalColumn: "ProductTypeID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
