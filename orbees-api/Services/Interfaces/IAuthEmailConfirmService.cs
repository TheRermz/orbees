namespace Api.Services.Interfaces
{
    public interface IAuthEmailConfirmService
    {
        Task ConfirmEmailAsync(string token);
    }
}
