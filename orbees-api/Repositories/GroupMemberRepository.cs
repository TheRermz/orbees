using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class GroupMemberRepository(ApiDbContext context) : IGroupMemberRepository
    {
        public async Task<GroupMember?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          await context.GroupMembers
                  .Include(m => m.User)
                  .Include(m => m.GroupRole)
                  .FirstOrDefaultAsync(m => m.Id == id && (includeInactive || m.IsActive));


        public async Task<IEnumerable<GroupMember>> GetAllAsync(bool includeInactive = false) =>
          await context.GroupMembers
                  .Include(m => m.User)
                  .Include(m => m.GroupRole)
                  .Where(m => includeInactive || m.IsActive)
                  .ToListAsync();

        public async Task<GroupMember?> GetByUserAndGroupAsync(Guid userId, Guid groupId) =>
          await context.GroupMembers
                  .Include(m => m.GroupRole)
                  .FirstOrDefaultAsync(m => m.UserId == userId && m.GroupId == groupId && m.IsActive);

        public async Task<IEnumerable<GroupMember>> GetByGroupIdAsync(Guid groupId) =>
          await context.GroupMembers
                  .Include(m => m.User)
                  .Include(m => m.GroupRole)
                  .Where(m => m.GroupId == groupId && m.IsActive)
                  .ToListAsync();

        public async Task<bool> IsAdminAsync(Guid userId, Guid groupId) =>
          await context.GroupMembers
                  .AnyAsync(
                      m => m.UserId == userId &&
                      m.GroupId == groupId &&
                      m.IsActive &&
                      m.GroupRole.Name == "Administrador"
                      );

        public async Task<bool> IsMemberAsync(Guid userId, Guid groupId) =>
          await context.GroupMembers
                  .AnyAsync(
                      m => m.UserId == userId &&
                      m.GroupId == groupId &&
                      m.IsActive
                      );

        public async Task AddAsync(GroupMember entity) =>
          await context.GroupMembers.AddAsync(entity);

        public async Task UpdateAsync(GroupMember entity) =>
          context.GroupMembers.Update(entity);

        public async Task DeleteAsync(GroupMember entity)
        {
            entity.IsActive = false;
            entity.LeftAt = DateTime.UtcNow;
            entity.UpdatedAt = DateTime.UtcNow;
            context.GroupMembers.Update(entity);
        }

        public async Task SaveChangesAsync() =>
          await context.SaveChangesAsync();
    }
}
