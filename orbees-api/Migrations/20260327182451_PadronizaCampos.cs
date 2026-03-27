using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace orbees_api.Migrations
{
    /// <inheritdoc />
    public partial class PadronizaCampos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_roles_roles_RoleId",
                table: "user_roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user_roles_users_UserId",
                table: "user_roles");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "user_roles",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "user_roles",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "user_roles",
                newName: "role_id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "user_roles",
                newName: "user_id");

            migrationBuilder.RenameIndex(
                name: "IX_user_roles_UserId",
                table: "user_roles",
                newName: "IX_user_roles_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_user_roles_RoleId",
                table: "user_roles",
                newName: "IX_user_roles_role_id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "roles",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "roles",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "RoleName",
                table: "roles",
                newName: "role_name");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "roles",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "roles",
                newName: "role_description");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "roles",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_roles_RoleName",
                table: "roles",
                newName: "IX_roles_role_name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "categories",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "categories",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "categories",
                newName: "category_name");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "categories",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "Icon",
                table: "categories",
                newName: "category_icon");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "categories",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "categories",
                newName: "category_color");

            migrationBuilder.RenameColumn(
                name: "Ispb",
                table: "banks",
                newName: "ispb");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "banks",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "banks",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "banks",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "CsvHeaderSignature",
                table: "banks",
                newName: "csv_header_signature");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "banks",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "BankName",
                table: "banks",
                newName: "bank_name");

            migrationBuilder.RenameColumn(
                name: "BankCode",
                table: "banks",
                newName: "bank_code");

            migrationBuilder.RenameIndex(
                name: "IX_banks_BankCode",
                table: "banks",
                newName: "IX_banks_bank_code");

            migrationBuilder.RenameColumn(
                name: "Agency",
                table: "bank_accounts",
                newName: "agency");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "bank_accounts",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "bank_accounts",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "bank_accounts",
                newName: "bank_account_name");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "bank_accounts",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "bank_accounts",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "AccountNumber",
                table: "bank_accounts",
                newName: "account_number");

            migrationBuilder.AddForeignKey(
                name: "FK_user_roles_roles_role_id",
                table: "user_roles",
                column: "role_id",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_roles_users_user_id",
                table: "user_roles",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_roles_roles_role_id",
                table: "user_roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user_roles_users_user_id",
                table: "user_roles");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "user_roles",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "user_roles",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "user_roles",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "user_roles",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_user_roles_user_id",
                table: "user_roles",
                newName: "IX_user_roles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_user_roles_role_id",
                table: "user_roles",
                newName: "IX_user_roles_RoleId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "roles",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "roles",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "role_name",
                table: "roles",
                newName: "RoleName");

            migrationBuilder.RenameColumn(
                name: "role_description",
                table: "roles",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "roles",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "roles",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "IX_roles_role_name",
                table: "roles",
                newName: "IX_roles_RoleName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "categories",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "categories",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "categories",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "categories",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "category_name",
                table: "categories",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "category_icon",
                table: "categories",
                newName: "Icon");

            migrationBuilder.RenameColumn(
                name: "category_color",
                table: "categories",
                newName: "Color");

            migrationBuilder.RenameColumn(
                name: "ispb",
                table: "banks",
                newName: "Ispb");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "banks",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "banks",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "banks",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "csv_header_signature",
                table: "banks",
                newName: "CsvHeaderSignature");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "banks",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "bank_name",
                table: "banks",
                newName: "BankName");

            migrationBuilder.RenameColumn(
                name: "bank_code",
                table: "banks",
                newName: "BankCode");

            migrationBuilder.RenameIndex(
                name: "IX_banks_bank_code",
                table: "banks",
                newName: "IX_banks_BankCode");

            migrationBuilder.RenameColumn(
                name: "agency",
                table: "bank_accounts",
                newName: "Agency");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "bank_accounts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "bank_accounts",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "bank_accounts",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "bank_accounts",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "bank_account_name",
                table: "bank_accounts",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "account_number",
                table: "bank_accounts",
                newName: "AccountNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_user_roles_roles_RoleId",
                table: "user_roles",
                column: "RoleId",
                principalTable: "roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_roles_users_UserId",
                table: "user_roles",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
