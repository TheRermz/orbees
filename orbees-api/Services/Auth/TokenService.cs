using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Api.Models;
using Api.Services.Interfaces.Auth;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services.Auth
{
    public class TokenService(IConfiguration config) : ITokenService
    {
        public string GenerateJwt(User user)
        {
            var secret = Environment.GetEnvironmentVariable("JWT_SECRET_KEY")
              ?? throw new InvalidOperationException("JWT_SECRET_KEY não definido!");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var roleClaims = user.UserRoles
              .Select(ur => new Claim(ClaimTypes.Role, ur.Role.RoleName));


            var claims = new[]
            {
              new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
              new Claim(JwtRegisteredClaimNames.Email, user.Email),
              new Claim("username", user.Username),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }.Concat(roleClaims);

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateSecureToken() =>
          Convert.ToBase64String(RandomNumberGenerator.GetBytes(64))
          .Replace("+", "-")
          .Replace("/", "_")
          .Replace("=", "");
    }
}
