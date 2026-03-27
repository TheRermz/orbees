using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Seeds
{
    public static class AdminSeeder
    {
        public static async Task SeedAsync(ApiDbContext context)
        {
            if (await context.Users.AnyAsync(u => u.Email == "admin@orbees.com.br")) return;

            var adminRole = await context.Roles.FirstAsync(r => r.RoleName == "Admin");

            var admin = new User
            {
                Email = "admin@orbees.com.br",
                Fullname = "Administrador",
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("@@123ABC"),
                EmailConfirmed = true,
                IsActive = true
            };

            await context.Users.AddAsync(admin);
            await context.SaveChangesAsync();

            await context.UserRoles.AddAsync(
                new UserRole
                {
                    UserId = admin.Id,
                    RoleId = adminRole.Id
                });

            await context.SaveChangesAsync();
        }
    }
}
