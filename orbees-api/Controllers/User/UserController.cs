using Api.Dtos.User;
using Api.Services.Interfaces.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;



namespace Api.Controllers.User
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController(IUserService userService) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
              ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
              ?? throw new UnauthorizedAccessException("Usuário não autenticado."));

        // GET /api/user/me
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var user = await userService.GetMeAsync(GetUserId());
            return Ok(user);
        }

        // PUT /api/user/me
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMe([FromBody] UserUpdateDto dto)
        {
            var user = await userService.UpdateMeAsync(GetUserId(), dto);
            return Ok(user);
        }

        // PUT /api/user/me/password
        [HttpPut("me/password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UserUpdatePasswordDto dto)
        {
            await userService.UpdatePasswordAsync(GetUserId(), dto.CurrentPassword, dto.NewPassword);
            return Ok(new { message = "Senha atualizada com sucesso." });
        }

        // DELETE /api/user/me
        public async Task<IActionResult> DeleteMe()
        {
            await userService.DeleteMeAsync(GetUserId());
            return Ok(new { message = "Conta desativada com sucesso." });
        }
    }
}
