using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Internet_Store.Migrations
{
    /// <inheritdoc />
    public partial class Image_url : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image_url",
                table: "Models",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image_url",
                table: "Models");
        }
    }
}
