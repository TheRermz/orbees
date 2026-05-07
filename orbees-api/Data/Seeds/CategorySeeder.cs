using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Seeds
{
    public static class CategorySeeder
    {
        public static async Task SeedAsync(ApiDbContext context)
        {
            if (await context.Categories.AnyAsync(c => c.UserId == null)) return;


            var categories = new List<Category>
            {
              new() { Name = "Alimentação",   Icon = "UtensilsCrossed", Color = "#F5A634", UserId = null },
              new() { Name = "Transporte",    Icon = "Car", Color = "#4A90D9", UserId = null },
              new() { Name = "Moradia",       Icon = "Home", Color = "#7ED321", UserId = null },
              new() { Name = "Saúde",         Icon = "Pill",            Color = "#E74C3C", UserId = null },
              new() { Name = "Educação",      Icon = "BookOpen",        Color = "#9B59B6", UserId = null },
              new() { Name = "Lazer",         Icon = "Gamepad2",        Color = "#1ABC9C", UserId = null },
              new() { Name = "Salário",       Icon = "Banknote",        Color = "#2ECC71", UserId = null },
              new() { Name = "Investimentos", Icon = "TrendingUp",      Color = "#F39C12", UserId = null },
              new() { Name = "Assinaturas",   Icon = "CreditCard",      Color = "#3498DB", UserId = null },
              new() { Name = "Vestuário",     Icon = "Shirt",           Color = "#E91E8C", UserId = null },
              new() { Name = "Pets",          Icon = "Dog",             Color = "#795548", UserId = null },
              new() { Name = "Viagens",       Icon = "Plane",           Color = "#00BCD4", UserId = null },
              new() { Name = "Outros",        Icon = "Package",         Color = "#95A5A6", UserId = null },
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }
    }
}
