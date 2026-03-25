namespace Api.Services.Interfaces.Auth
{
    public interface IAuthPasswordService
    {
        Task ForgotPasswordAsync(string email);
        Task ResetPasswordAsync(string token, string newPassword);
    }
}
