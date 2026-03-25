namespace Api.Services.Interfaces.Auth
{
    public interface IAuthLoginService
    {
        Task<string> LoginAsync(string email, string password);
    }
}
