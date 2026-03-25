using Api.Dtos;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Auth;

namespace Api.Services.Auth
{
    public class AuthRegisterService(
        IUserRepository userRepository,
        IEmailService emailService,
        ITokenService tokenService
        ) : IAuthRegisterService
    {
        public async Task<UserReadDto> RegisterAsync(UserCreateDto dto)
        {
            if (await userRepository.EmailExistsAsync(dto.Email))
                throw new InvalidOperationException("Email já cadastrado.");

            if (await userRepository.UsernameExistsAsync(dto.Username))
                throw new InvalidOperationException("Username já está em uso.");

            var confirmToken = tokenService.GenerateSecureToken();

            var user = new User
            {
                Email = dto.Email,
                Fullname = dto.Fullname,
                Username = dto.Username,
                PasswordHash = dto.Password != null
                ? BCrypt.Net.BCrypt.HashPassword(dto.Password)
                : null,
                EmailConfirmed = false,
                EmailConfirmationToken = confirmToken,
                EmailConfirmationExpiresAt = DateTime.UtcNow.AddHours(24)
            };

            await userRepository.AddAsync(user);

            await userRepository.SaveChangesAsync();

            await emailService.SendEmailConfirmationAsync(user.Email, user.Fullname, confirmToken);

            return new UserReadDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Fullname = user.Fullname
            };
        }
    }
}
