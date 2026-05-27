using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class TransactionRepository(ApiDbContext context) : ITransactionRepository
    {
        public async Task<Transaction?> GetByIdAsync(Guid id, bool includeInactive = false) =>
            await context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.BankAccount)
                  .ThenInclude(ba => ba != null ? ba.Bank : null)
                .Include(t => t.Group)
                .FirstOrDefaultAsync(t => t.Id == id && (includeInactive || t.IsActive));

        public async Task<Transaction?> GetByIdAndUserIdAsync(Guid id, Guid userId) =>
            await context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.BankAccount)
                    .ThenInclude(ba => ba != null ? ba.Bank : null)
                .Include(t => t.Group)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId && t.IsActive);

        public async Task<IEnumerable<Transaction>> GetAllAsync(bool includeInactive = false) =>
            await context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.BankAccount)
                .Include(t => t.Group)
                .Where(t => includeInactive || t.IsActive)
                .ToListAsync();

        public async Task<IEnumerable<Transaction>> GetByUserIdAsync(Guid userId, DateTime? from = null, DateTime? to = null) =>
            await context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.BankAccount)
                    .ThenInclude(ba => ba != null ? ba.Bank : null)
                .Include(t => t.Group)
                .Where(t =>
                    t.UserId == userId &&
                    t.IsActive &&
                    (from == null || t.TransactionDate >= from) &&
                    (to == null || t.TransactionDate <= to))
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();

        public async Task<IEnumerable<Transaction>> GetByGroupIdAsync(Guid groupId, DateTime? from = null, DateTime? to = null) =>
            await context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.User)
                .Where(t =>
                    t.GroupId == groupId &&
                    t.GroupLinkActive &&
                    t.IsActive &&
                    (from == null || t.TransactionDate >= from) &&
                    (to == null || t.TransactionDate <= to))
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();

        public async Task<IEnumerable<Transaction>> GetByBankAccountIdAsync(Guid bankAccountId) =>
            await context.Transactions
                .Include(t => t.Category)
                .Where(t => t.BankAccountId == bankAccountId && t.IsActive)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();

        public async Task<IEnumerable<Transaction>> GetSimilarTransactionsAsync(Guid userId, string originalDescription, int limit = 5) =>
            await context.Transactions
                .Where(t =>
                    t.UserId == userId &&
                    t.IsActive &&
                    t.CategoryId != null &&
                    t.OriginalDescription != null &&
                    EF.Functions.ILike(t.OriginalDescription, $"%{originalDescription}%"))
                .Include(t => t.Category)
                .OrderByDescending(t => t.TransactionDate)
                .Take(limit)
                .ToListAsync();

        public async Task<(IEnumerable<Transaction> Items, int Total)> GetByUserIdPagedAsync(
              Guid userId, int page, int pageSize, DateTime? from = null, DateTime? to = null)
        {
            var utcFrom = from.HasValue ? DateTime.SpecifyKind(from.Value, DateTimeKind.Utc) : (DateTime?)null;
            var utcTo = to.HasValue ? DateTime.SpecifyKind(to.Value, DateTimeKind.Utc) : (DateTime?)null;

            var query = context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.BankAccount)
                    .ThenInclude(ba => ba != null ? ba.Bank : null)
                .Include(t => t.Group)
                .Where(t =>
                    t.UserId == userId &&
                    t.IsActive &&
                    (utcFrom == null || t.TransactionDate >= utcFrom) &&
                    (utcTo == null || t.TransactionDate <= utcTo))
                .OrderByDescending(t => t.TransactionDate);

            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, total);
        }

        public async Task<(IEnumerable<Transaction> Items, int Total)> GetByGroupIdPagedAsync(
               Guid groupId, int page, int pageSize, DateTime? from = null, DateTime? to = null)
        {
            var utcFrom = from.HasValue ? DateTime.SpecifyKind(from.Value, DateTimeKind.Utc) : (DateTime?)null;
            var utcTo = to.HasValue ? DateTime.SpecifyKind(to.Value, DateTimeKind.Utc) : (DateTime?)null;

            var query = context.Transactions
                .Include(t => t.Category)
                .Include(t => t.GroupCategory)
                .Include(t => t.User)
                .Where(t =>
                    t.GroupId == groupId &&
                    t.GroupLinkActive &&
                    t.IsActive &&
                    (utcFrom == null || t.TransactionDate >= utcFrom) &&
                    (utcTo == null || t.TransactionDate <= utcTo))
                .OrderByDescending(t => t.TransactionDate);

            var total = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, total);
        }

        public async Task AddAsync(Transaction entity) =>
            await context.Transactions.AddAsync(entity);

        public async Task AddRangeAsync(IEnumerable<Transaction> transactions) =>
            await context.Transactions.AddRangeAsync(transactions);

        public async Task UpdateAsync(Transaction entity) =>
            context.Transactions.Update(entity);

        public async Task DeleteAsync(Transaction entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.Transactions.Update(entity);
        }

        public async Task SaveChangesAsync() =>
            await context.SaveChangesAsync();
    }
}
