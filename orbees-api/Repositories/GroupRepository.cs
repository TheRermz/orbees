using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class GroupRepository(ApiDbContext context) : IGroupRepository
    {
        public async Task<Group?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          await context.Groups
                .FirstOrDefaultAsync(g => g.Id == id && (includeInactive || g.IsActive));

        public async Task<Group?> GetByIdWithMembersAsync(Guid id) =>
          await context.Groups
                  .Include(g => g.Members.Where(m => m.IsActive))
                    .ThenInclude(m => m.User)
                  .Include(g => g.Members.Where(m => m.IsActive))
                    .ThenInclude(m => m.GroupRole)
                  .FirstOrDefaultAsync(g => g.Id == id && g.IsActive);

        public async Task<IEnumerable<Group>> GetAllAsync(bool includeInactive = false) =>
          await context.Groups
            .Where(g => includeInactive || g.IsActive)
            .ToListAsync();

        public async Task<IEnumerable<Group>> GetByUserIdAsync(Guid userId) =>
          await context.Groups
                .Include(g => g.Members.Where(m => m.IsActive))
                .Where(g => g.IsActive && g.Members.Any(m => m.UserId == userId && m.IsActive))
                .ToListAsync();

        public async Task<bool> UserIsInAnyGroupAsync(Guid userId) =>
          await context.GroupMembers
                .AnyAsync(m => m.UserId == userId && m.IsActive);

        public async Task AddAsync(Group entity) =>
          await context.Groups.AddAsync(entity);

        public async Task UpdateAsync(Group entity) =>
          context.Groups.Update(entity);

        public async Task DeleteAsync(Group entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.Groups.Update(entity);
        }

        public async Task SaveChangesAsync() =>
          await context.SaveChangesAsync();
    }
}
