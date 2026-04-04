using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IGroupRoleRepository : IRepository<GroupRole>
    {
        Task<GroupRole?> GetByNameAsync(string name);
    }
}
