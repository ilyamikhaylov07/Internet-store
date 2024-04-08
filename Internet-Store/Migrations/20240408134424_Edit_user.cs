using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Internet_Store.Migrations
{
    /// <inheritdoc />
    public partial class Edit_user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Workers",
                newName: "Password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Workers",
                newName: "PhoneNumber");
        }
    }
}
