using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Seeds
{
    public static class GroupRoleSeeder
    {
        public static async Task SeedAsync(ApiDbContext context)
        {
            if (await context.GroupRoles.AnyAsync()) return;

            var roles = new List<GroupRole>
      {
        new() { Name = "Administrador" },
        new() { Name = "Membro" }
      };

            await context.GroupRoles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }
    }
}
