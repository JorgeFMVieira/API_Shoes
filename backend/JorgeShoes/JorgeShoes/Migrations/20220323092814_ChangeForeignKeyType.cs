using Microsoft.EntityFrameworkCore.Migrations;

namespace JorgeShoes.Migrations
{
    public partial class ChangeForeignKeyType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID1",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductTypeID1",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductTypeID1",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "ProductTypeID",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductTypeID",
                table: "Products",
                column: "ProductTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID",
                table: "Products",
                column: "ProductTypeID",
                principalTable: "ProductTypes",
                principalColumn: "ProductTypeID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductTypeID",
                table: "Products");

            migrationBuilder.AlterColumn<string>(
                name: "ProductTypeID",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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
    }
}
