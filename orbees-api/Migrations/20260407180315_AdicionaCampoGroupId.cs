using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace orbees_api.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaCampoGroupId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "category_color",
                table: "categories",
                type: "character varying(7)",
                maxLength: 7,
                nullable: true,
                defaultValue: "#262626",
                oldClrType: typeof(string),
                oldType: "character varying(7)",
                oldMaxLength: 7,
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "group_id",
                table: "categories",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_categories_group_id",
                table: "categories",
                column: "group_id");

            migrationBuilder.AddForeignKey(
                name: "FK_categories_groups_group_id",
                table: "categories",
                column: "group_id",
                principalTable: "groups",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_categories_groups_group_id",
                table: "categories");

            migrationBuilder.DropIndex(
                name: "IX_categories_group_id",
                table: "categories");

            migrationBuilder.DropColumn(
                name: "group_id",
                table: "categories");

            migrationBuilder.AlterColumn<string>(
                name: "category_color",
                table: "categories",
                type: "character varying(7)",
                maxLength: 7,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(7)",
                oldMaxLength: 7,
                oldNullable: true,
                oldDefaultValue: "#262626");
        }
    }
}
