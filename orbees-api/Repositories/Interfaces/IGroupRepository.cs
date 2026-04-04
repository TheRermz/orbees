using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        Task<Group?> GetByIdWithMembersAsync(Guid id);
        Task<IEnumerable<Group>> GetByUserIdAsync(Guid userId);
        Task<bool> UserIsInAnyGroupAsync(Guid userId);
    }
}
