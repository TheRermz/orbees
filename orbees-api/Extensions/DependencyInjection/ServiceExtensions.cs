using Api.Services.Auth;
using Api.Services.Email;
using Api.Services.UserProfile;
using Api.Services.Interfaces.Auth;
using Api.Services.Interfaces.Email;
using Api.Services.Interfaces.UserProfile;

namespace Api.Extensions.DependencyInjection
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // --- AUTH ---
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthRegisterService, AuthRegisterService>();
            services.AddScoped<IAuthLoginService, AuthLoginService>();
            services.AddScoped<IAuthEmailConfirmService, AuthEmailConfirmService>();
            services.AddScoped<IAuthPasswordService, AuthPasswordService>();
            services.AddScoped<IAuthOAuthService, AuthOAuthService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailService, EmailService>();
            // --- USER ---
            services.AddScoped<IUserService, UserService>();
            return services;

        }
    }
}
