using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        Task<IEnumerable<Transaction>> GetByUserIdAsync(Guid userId, DateTime? from = null, DateTime? to = null);
        Task<IEnumerable<Transaction>> GetByGroupIdAsync(Guid groupId, DateTime? from = null, DateTime? to = null);
        Task<IEnumerable<Transaction>> GetByBankAccountIdAsync(Guid bankAccountId);
        Task<Transaction?> GetByIdAndUserIdAsync(Guid id, Guid userId);
        Task<IEnumerable<Transaction>> GetSimilarTransactionsAsync(Guid userId, string originalDescription, int limit = 5);
        Task AddRangeAsync(IEnumerable<Transaction> transactions);
        Task<(IEnumerable<Transaction> Items, int Total)> GetByUserIdPagedAsync(
            Guid userId, int page, int pageSize, DateTime? from = null, DateTime? to = null);
        Task<(IEnumerable<Transaction> Items, int Total)> GetByGroupIdPagedAsync(
            Guid groupId, int page, int pageSize, DateTime? from = null, DateTime? to = null);
    }
}
