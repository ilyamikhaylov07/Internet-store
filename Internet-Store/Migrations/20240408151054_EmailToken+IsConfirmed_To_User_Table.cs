using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Internet_Store.Migrations
{
    /// <inheritdoc />
    public partial class EmailTokenIsConfirmed_To_User_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailToken",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmed",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsConfirmed",
                table: "Users");
        }
    }
}
