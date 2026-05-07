using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByOAuthProviderIdAsync(string provider, string providerId);
        Task<User?> GetByEmailConfirmationTokenAsync(string token);
        Task<User?> GetByPasswordResetTokenAsync(string token);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> UsernameExistsAsync(string username);
    }
}
