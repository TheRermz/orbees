using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace orbees_api.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaPromotedAtGroupMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "promoted_at",
                table: "group_members",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "promoted_at",
                table: "group_members");
        }
    }
}
