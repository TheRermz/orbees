using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IBankAccountRepository : IRepository<BankAccount>
    {
        Task<IEnumerable<BankAccount>> GetByUserIdAsync(Guid userId);
        Task<BankAccount?> GetByIdAndUserIdAsync(Guid id, Guid userId);
        Task<bool> UserHasAccountAsync(Guid userId, Guid accountId);
    }
}
