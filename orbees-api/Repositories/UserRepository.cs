using Api.Data;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class UserRepository(ApiDbContext context) : IUserRepository
    {
        public async Task<User?> GetByIdAsync(Guid id, bool includeInactive = false) =>
          await context.Users
          .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
          .FirstOrDefaultAsync(u => u.Id == id && (includeInactive || u.IsActive));

        public async Task<IEnumerable<User>> GetAllAsync(bool includeInactive) => await context.Users.Where(u => includeInactive || u.IsActive).ToListAsync();

        public async Task AddAsync(User entity) => await context.Users.AddAsync(entity);

        public async Task UpdateAsync(User entity) => context.Users.Update(entity);

        public async Task DeleteAsync(User entity)
        {
            entity.IsActive = false;
            entity.UpdatedAt = DateTime.UtcNow;
            context.Users.Update(entity);
        }

        public async Task SaveChangesAsync() => await context.SaveChangesAsync();

        public async Task<User?> GetByEmailAsync(string email) => await context.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User?> GetByOAuthProviderIdAsync(string provider, string providerId) => await context.Users.FirstOrDefaultAsync(u => u.OAuthProvider == provider && u.OAuthProviderId == providerId);

        public async Task<User?> GetByEmailConfirmationTokenAsync(string token) => await context.Users.FirstOrDefaultAsync(u => u.EmailConfirmationToken == token);

        public async Task<User?> GetByPasswordResetTokenAsync(string token) => await context.Users.FirstOrDefaultAsync(u => u.PwdResetToken == token);

        public async Task<bool> EmailExistsAsync(string email) => await context.Users.AnyAsync(u => u.Email == email);

        public async Task<bool> UsernameExistsAsync(string username) => await context.Users.AnyAsync(u => u.Username == username);
    }
}
