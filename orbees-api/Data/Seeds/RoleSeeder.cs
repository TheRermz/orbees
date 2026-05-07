using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Seeds
{
    public static class RoleSeeder
    {
        public static async Task SeedAsync(ApiDbContext context)
        {
            if (await context.Roles.AnyAsync()) return;

            var roles = new List<Role>
            {
              new() { RoleName = "Admin", Description = "Administrador do Sistema" },
              new() { RoleName = "User", Description = "Usuário padrão" }
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }
    }
}
