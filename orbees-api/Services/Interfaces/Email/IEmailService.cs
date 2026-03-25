namespace Api.Services.Interfaces.Email
{
    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string to, string name, string token);
        Task SendPasswordResetAsync(string to, string name, string token);
    }
}
