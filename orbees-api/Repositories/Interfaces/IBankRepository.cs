using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IBankRepository
    {
        Task<Bank?> GetByIdAsync(int id, bool includeInactive = false);
        Task<IEnumerable<Bank>> GetAllAsync(bool includeInactive = false);
        Task<IEnumerable<Bank>> GetAllActiveAsync();
        Task<Bank?> GetByCodeAsync(string code);
        Task AddAsync(Bank entity);
        Task UpdateAsync(Bank entity);
        Task DeleteAsync(Bank entity);
        Task SaveChangesAsync();
    }
}
