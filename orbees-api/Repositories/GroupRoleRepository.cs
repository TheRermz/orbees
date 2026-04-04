using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class GroupRoleRepository(ApiDbContext context) : IGroupRoleRepository
    {
        public async Task<GroupRole?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          await context.GroupRoles
                  .FirstOrDefaultAsync(
                      r => r.Id == id && (includeInactive || r.IsActive)
                      );

        public async Task<IEnumerable<GroupRole>> GetAllAsync(bool includeInactive = false) =>
          await context.GroupRoles
                  .Where(r => includeInactive || r.IsActive)
                  .ToListAsync();

        public async Task<GroupRole?> GetByNameAsync(string name) =>
                    await context.GroupRoles
                        .FirstOrDefaultAsync(r => r.Name == name);

        public async Task AddAsync(GroupRole entity) =>
          await context.GroupRoles.AddAsync(entity);

        public async Task UpdateAsync(GroupRole entity) =>
          context.GroupRoles.Update(entity);

        public async Task DeleteAsync(GroupRole entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.GroupRoles.Update(entity);
        }

        public async Task SaveChangesAsync() =>
          await context.SaveChangesAsync();
    }
}
