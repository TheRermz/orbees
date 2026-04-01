using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class BankRepository(ApiDbContext context) : IBankRepository
    {
        public async Task<Bank?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          throw new NotImplementedException();

        public async Task<Bank?> GetByIdAsync(int id, bool includeInactive = false) =>
          await context.Banks.FirstOrDefaultAsync(b => b.Id == id && (includeInactive || b.IsActive));

        public async Task<IEnumerable<Bank>> GetAllAsync(bool includeInactive = false) =>
          await context.Banks.Where(b => includeInactive || b.IsActive).ToListAsync();

        public async Task<IEnumerable<Bank>> GetAllActive() =>
          await context.Banks.Where(b => b.IsActive).ToListAsync();

        public async Task<Bank?> GetByCodeAsync(string code) =>
          await context.Banks.FirstOrDefaultAsync(b => b.BankCode == code && b.IsActive);

        public async Task AddAsync(Bank entity) =>
          await context.Banks.AddAsync(entity);

        public async Task UpdateAsync(Bank entity) =>
          context.Banks.Update(entity);

        public async Task DeleteAsync(Bank entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.Banks.Update(entity);
        }

        public async Task SaveChangesAsync() =>
          await context.SaveChangesAsync();
    }
}
