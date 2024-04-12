using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Internet_Store.Migrations
{
    /// <inheritdoc />
    public partial class Swap_type_price : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Price",
                table: "Models",
                type: "text",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Models",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
