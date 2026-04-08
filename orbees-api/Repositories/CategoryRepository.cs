using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class CategoryRepository(ApiDbContext context) : ICategoryRepository
    {
        public async Task<Category?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          await context.Categories
                  .Include(c => c.Group)
                  .FirstOrDefaultAsync(c => c.Id == id && (includeInactive || c.IsActive));

        public async Task<IEnumerable<Category>> GetAllAsync(bool includeInactive = false) =>
          await context.Categories
                  .Include(c => c.Group)
                  .Where(c => includeInactive || c.IsActive)
                  .ToListAsync();

        public async Task<IEnumerable<Category>> GetSystemCategoriesAsync() =>
          await context.Categories
                  .Where(c => c.UserId == null && c.GroupId == null && c.IsActive)
                  .ToListAsync();

        public async Task<IEnumerable<Category>> GetByUserIdAsync(Guid userId) =>
          await context.Categories
                  .Where(c => c.UserId == userId && c.IsActive)
                  .ToListAsync();

        public async Task<IEnumerable<Category>> GetByGroupIdAsync(Guid groupId) =>
          await context.Categories
                  .Where(c => c.GroupId == groupId && c.IsActive)
                  .ToListAsync();

        public async Task<bool> NameExistsForUserAsync(Guid userId, string name) =>
          await context.Categories
                  .AnyAsync(c => c.UserId == userId && c.Name == name && c.IsActive);

        public async Task AddAsync(Category entity) =>
          await context.Categories.AddAsync(entity);

        public async Task UpdateAsync(Category entity) =>
          context.Categories.Update(entity);

        public async Task DeleteAsync(Category entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.Categories.Update(entity);
        }

        public async Task SaveChangesAsync() =>
          await context.SaveChangesAsync();
    }
}
