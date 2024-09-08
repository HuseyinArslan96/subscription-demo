using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SubscriberApp.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMessagesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "message",
                table: "messages",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "receiver_name",
                table: "messages",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "sender_name",
                table: "messages",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "receiver_name",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "sender_name",
                table: "messages");

            migrationBuilder.AlterColumn<string>(
                name: "message",
                table: "messages",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
