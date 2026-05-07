using Api.Models;

namespace Api.Services.Interfaces.Auth
{
    public interface ITokenService
    {
        string GenerateJwt(User user);
        string GenerateSecureToken();
    }
}
