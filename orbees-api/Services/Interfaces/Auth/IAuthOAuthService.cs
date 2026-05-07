namespace Api.Services.Interfaces.Auth
{
    public interface IAuthOAuthService
    {
        Task<string> HandleGoogleCallbackAsync(string email, string name, string providerId);
    }
}
