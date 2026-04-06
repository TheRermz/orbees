using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Seeds
{
    public static class DebugUserSeeder
    {
        private static readonly string[] FirstNames = [
          "Maria", "José", "Ana", "João", "Antônio",
          "Francisco", "Pedro", "Carlos", "Lucas", "Luiz",
          "Paulo", "Gabriel", "Rafael", "Daniel", "Marcelo",
          "Bruno", "Eduardo", "Felipe", "Mateus", "Thiago",
          "Fernando", "André", "Ricardo", "Rodrigo", "Diego",
          "Leonardo", "Gustavo", "Vinicius", "Roberto", "Fábio",
          "Juliana", "Fernanda", "Patrícia", "Aline", "Camila",
          "Amanda", "Larissa", "Mariana", "Bruna", "Carla",
          "Beatriz", "Isabela", "Natália", "Renata", "Vanessa",
          "Tatiane", "Cristiane", "Débora", "Sandra", "Adriana"
        ];

        private static readonly string[] LastNames = [
          "Silva", "Santos", "Oliveira", "Souza", "Pereira",
          "Ferreira", "Lima", "Alves", "Rodrigues", "Costa",
          "Sousa", "Gomes", "Nascimento", "Araújo", "Ribeiro",
          "Almeida", "Jesus", "Barbosa", "Soares", "Carvalho",
          "Martins", "Lopes", "Vieira", "Rocha", "Dias",
          "Gonçalves", "Fernandes", "Santana", "Andrade", "Batista",
          "Teixeira", "Moreira", "Correia", "Cardoso", "Reis",
          "Freitas", "Machado", "Monteiro", "Mendes", "Nunes",
          "Cavalcante", "Pinto", "Moura", "Campos", "Castro",
          "Barros", "Borges", "Miranda", "Pinheiro", "Coelho"
        ];

        private static string NormalizeUsername(string name) =>
          new string(name.Normalize(System.Text.NormalizationForm.FormD)
              .Where(c => System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c)
                  != System.Globalization.UnicodeCategory.NonSpacingMark)
              .ToArray())
              .ToLower()
              .Replace(" ", "");

        public static async Task SeedAsync(ApiDbContext context)
        {
            var seedEnabled = Environment.GetEnvironmentVariable("SEED_DB");
            if (seedEnabled != "true") return;

            if (await context.Users.AnyAsync(u => u.Email.EndsWith("@debug.orbees.com.br"))) return;

            var userRole = await context.Roles.FirstOrDefaultAsync(r => r.RoleName == "User");
            if (userRole == null) return;

            var random = new Random();
            var usersToAdd = new List<User>();

            for (int i = 1; i <= 20; i++)
            {
                var firstName = FirstNames[random.Next(FirstNames.Length)];
                var lastName = LastNames[random.Next(FirstNames.Length)];
                var username = $"{NormalizeUsername(firstName)}.{NormalizeUsername(lastName)}{i}";
                var email = $"{username}@debug.orbees.com.br";

                if (await context.Users.AnyAsync(u => u.Email == email)) continue;

                usersToAdd.Add(new User
                {
                    Email = email,
                    Fullname = $"{firstName} {lastName}",
                    Username = username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Debug@123"),
                    EmailConfirmed = true,
                    IsActive = true
                });
            }

            if (usersToAdd.Count == 0) return;

            await context.Users.AddRangeAsync(usersToAdd);
            await context.SaveChangesAsync();

            var userRoles = usersToAdd.Select(u => new UserRole
            {
                UserId = u.Id,
                RoleId = userRole.Id
            });

            await context.UserRoles.AddRangeAsync(userRoles);
            await context.SaveChangesAsync();

        }
    }
}
