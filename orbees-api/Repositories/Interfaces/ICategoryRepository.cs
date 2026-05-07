using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<IEnumerable<Category>> GetSystemCategoriesAsync();
        Task<IEnumerable<Category>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<Category>> GetByGroupIdAsync(Guid groupId);
        Task<bool> NameExistsForUserAsync(Guid userId, string name);
    }
}
