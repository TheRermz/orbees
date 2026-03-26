using FluentValidation;
using FluentValidation.AspNetCore;
using Api.Validators.User;

namespace Api.Extensions.DependencyInjection
{
    public static class ValidatorExtensions
    {
        public static IServiceCollection AddApplicationValidators(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<UserCreateDtoValidator>();
            services.AddValidatorsFromAssemblyContaining<UserUpdateDtoValidator>();

            return services;
        }
    }
}
