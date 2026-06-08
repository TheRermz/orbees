using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Seeds
{
    public static class BankSeeder
    {
        public static async Task SeedAsync(ApiDbContext context)
        {
            if (await context.Banks.AnyAsync()) return;

            var banks = new List<Bank>
            {
              new() { BankName = "Nubank",                  BankCode = "260", Ispb = "18236120", IsActive = true },
              new() { BankName = "Itaú Unibanco",           BankCode = "341", Ispb = "60701190", IsActive = false }, // Não implementado
              new() { BankName = "Bradesco",                BankCode = "237", Ispb = "60746948", IsActive = false }, // Não implementado
              new() { BankName = "Banco do Brasil",         BankCode = "001", Ispb = "00000000", IsActive = true },
              new() { BankName = "Caixa Econômica Federal", BankCode = "104", Ispb = "36074118", IsActive = false }, // Não implementado
              new() { BankName = "Santander",               BankCode = "033", Ispb = "90400888", IsActive = true },
              new() { BankName = "Banco Inter",             BankCode = "077", Ispb = "00416968", IsActive = true },
            };

            await context.Banks.AddRangeAsync(banks);
            await context.SaveChangesAsync();
        }
    }
}
