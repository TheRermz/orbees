using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IGroupMemberRepository : IRepository<GroupMember>
    {
        Task<GroupMember?> GetByUserAndGroupAsync(Guid userId, Guid groupId);
        Task<IEnumerable<GroupMember>> GetByGroupIdAsync(Guid groupId);
        Task<bool> IsAdminAsync(Guid userId, Guid groupId);
        Task<bool> IsMemberAsync(Guid userId, Guid groupId);
    }
}
