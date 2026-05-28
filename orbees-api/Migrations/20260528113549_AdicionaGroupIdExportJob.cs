using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace orbees_api.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaGroupIdExportJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "export_jobs",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_export_jobs_GroupId",
                table: "export_jobs",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_export_jobs_groups_GroupId",
                table: "export_jobs",
                column: "GroupId",
                principalTable: "groups",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_export_jobs_groups_GroupId",
                table: "export_jobs");

            migrationBuilder.DropIndex(
                name: "IX_export_jobs_GroupId",
                table: "export_jobs");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "export_jobs");
        }
    }
}
