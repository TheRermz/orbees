namespace Api.Services.Interfaces
{
    public interface IAuthLoginService
    {
        Task<string> LoginAsync(string email, string password);
    }
}
