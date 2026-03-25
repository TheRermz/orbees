namespace Api.Services.Interfaces.Auth
{
    public interface IAuthEmailConfirmService
    {
        Task ConfirmEmailAsync(string token);
    }
}
