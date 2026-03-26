using Api.Dtos.User;
using Api.Dtos.Auth;
using Api.Services.Interfaces.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;

namespace Api.Controllers.Auth
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        // POST /api/auth/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserCreateDto dto)
        {
            var user = await authService.RegisterAsync(dto);
            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }

        //POST /api/auth/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await authService.LoginAsync(dto.Email, dto.Password);
            return Ok(new { token });
        }

        //GET /api/auth/confirm-email?token=xxx
        [HttpGet("confirm-email")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string token)
        {
            await authService.ConfirmEmailAsync(token);
            return Ok(new { message = "Email confirmado com sucesso" });
        }

        //POST /api/auth/forgot-password
        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            await authService.ForgotPasswordAsync(dto.Email);
            return Ok(new { message = "Se o email existir, você receberá as instruções em breve." });
        }

        //POST /api/auth/reset-password
        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            await authService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            return Ok(new { message = "Senha redefinida com sucesso." });
        }

        //GET /api/auth/google
        [HttpGet("google")]
        [AllowAnonymous]
        public IActionResult GoogleLogin()
        {
            var redirectUrl = Url.Action(nameof(GoogleCallback), "Auth");
            var properties = new Microsoft.AspNetCore.Authentication.AuthenticationProperties
            {
                RedirectUri = redirectUrl
            };
            return Challenge(properties, "Google");
        }

        //GET /api/auth/google/callback
        [HttpGet("google/callback")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync("Google");
            if (!result.Succeeded)
                return Unauthorized(new { message = "Falha na autenticação com Google." });

            var email = result.Principal.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value
                ?? throw new InvalidOperationException("Email não retornado pelo Google.");
            var name = result.Principal.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value ?? email;
            var providerId = result.Principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                ?? throw new InvalidOperationException("Provider ID não retornado pelo Google.");

            var token = await authService.HandleGoogleCallbackAsync(email, name, providerId);

            // Redireciona para o frontend com o token na query string
            return Redirect($"{Environment.GetEnvironmentVariable("FRONTEND_URL")}/auth/callback?token={token}");
        }
    }
}
