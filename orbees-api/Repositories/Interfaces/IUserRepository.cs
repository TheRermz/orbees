using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByIdAsync(Guid id, bool includeInactive = false);
        Task<IEnumerable<User>> GetAllAsync(bool includeInactive = false);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByOAuthProviderIdAsync(string provider, string providerId);
        Task<User?> GetByEmailConfirmationTokenAsync(string token);
        Task<User?> GetByPasswordResetTokenAsync(string token);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> UsernameExistsAsync(string username);
    }
}
