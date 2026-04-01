using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IBankRepository : IRepository<Bank>
    {
        Task<Bank?> GetByCodeAsync(string code);
        Task<IEnumerable<Bank>> GetAllActive();
    }
}
