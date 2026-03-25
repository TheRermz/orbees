using Api.Models;

namespace Api.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwt(User user);
        string GenerateSecureToken();
    }
}
