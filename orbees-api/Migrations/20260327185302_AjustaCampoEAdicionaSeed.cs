using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace orbees_api.Migrations
{
    /// <inheritdoc />
    public partial class AjustaCampoEAdicionaSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bank_accounts_banks_BankId",
                table: "bank_accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_bank_accounts_users_UserId",
                table: "bank_accounts");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "bank_accounts",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "BankId",
                table: "bank_accounts",
                newName: "bank_id");

            migrationBuilder.RenameIndex(
                name: "IX_bank_accounts_UserId",
                table: "bank_accounts",
                newName: "IX_bank_accounts_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_bank_accounts_BankId",
                table: "bank_accounts",
                newName: "IX_bank_accounts_bank_id");

            migrationBuilder.AddForeignKey(
                name: "FK_bank_accounts_banks_bank_id",
                table: "bank_accounts",
                column: "bank_id",
                principalTable: "banks",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_bank_accounts_users_user_id",
                table: "bank_accounts",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bank_accounts_banks_bank_id",
                table: "bank_accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_bank_accounts_users_user_id",
                table: "bank_accounts");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "bank_accounts",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "bank_id",
                table: "bank_accounts",
                newName: "BankId");

            migrationBuilder.RenameIndex(
                name: "IX_bank_accounts_user_id",
                table: "bank_accounts",
                newName: "IX_bank_accounts_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_bank_accounts_bank_id",
                table: "bank_accounts",
                newName: "IX_bank_accounts_BankId");

            migrationBuilder.AddForeignKey(
                name: "FK_bank_accounts_banks_BankId",
                table: "bank_accounts",
                column: "BankId",
                principalTable: "banks",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_bank_accounts_users_UserId",
                table: "bank_accounts",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
