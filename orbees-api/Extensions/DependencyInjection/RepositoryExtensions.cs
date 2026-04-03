using Api.Repositories;
using Api.Repositories.Interfaces;


namespace Api.Extensions.DependencyInjection
{
    public static class RepositoryExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            // --- USER ---
            services.AddScoped<IUserRepository, UserRepository>();
            // --- Bank and BankAccount ---
            services.AddScoped<IBankRepository, BankRepository>();
            services.AddScoped<IBankAccountRepository, BankAccountRepository>();
            return services;
        }
    }
}
