using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class BankAccountRepository(ApiDbContext context) : IBankAccountRepository
    {
        public async Task<BankAccount?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          await context.BankAccounts
                .Include(ba => ba.Bank)
                .FirstOrDefaultAsync(ba => ba.Id == id && (includeInactive || ba.IsActive));

        public async Task<IEnumerable<BankAccount>> GetAllAsync(bool includeInactive = false) =>
          await context.BankAccounts
                .Include(ba => ba.Bank)
                .Where(ba => includeInactive || ba.IsActive)
                .ToListAsync();

        public async Task<IEnumerable<BankAccount>> GetByUserIdAsync(Guid userId) =>
          await context.BankAccounts
                .Include(ba => ba.Bank)
                .Where(ba => ba.UserId == userId && ba.IsActive)
                .ToListAsync();

        public async Task<BankAccount?> GetByIdAndUserIdAsync(Guid id, Guid userId) =>
          await context.BankAccounts
                .Include(ba => ba.Bank)
                .FirstOrDefaultAsync(ba => ba.Id == id && ba.UserId == userId && ba.IsActive);

        public async Task<bool> UserHasAccountAsync(Guid userId, Guid accountId) =>
          await context.BankAccounts
                .AnyAsync(ba => ba.Id == accountId && ba.UserId == userId && ba.IsActive);

        public async Task AddAsync(BankAccount entity) =>
          await context.BankAccounts.AddAsync(entity);

        public async Task UpdateAsync(BankAccount entity) =>
          context.BankAccounts.Update(entity);

        public async Task DeleteAsync(BankAccount entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.BankAccounts.Update(entity);
        }

        public async Task SaveChangesAsync() =>
          await context.SaveChangesAsync();
    }
}
