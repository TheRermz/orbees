using Api.Dtos.BankAccount;
using Api.Services.Interfaces.BankAccount;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers.BankAccount
{
    [ApiController]
    [Route("api/bank-accounts")]
    [Authorize]
    public class BankAccountController(IBankAccountService bankAccountService) : ControllerBase
    {
        private Guid GetUserId() =>
        Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
          ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
          ?? throw new UnauthorizedAccessException("Usuário não autenticado."));


        // GET /api/bank-accounts
        [HttpGet]
        public async Task<IActionResult> GetMyAccounts()
        {
            var accounts = await bankAccountService.GetMyAccountsAsync(GetUserId());
            return Ok(accounts);
        }

        // GET /api/bank-accounts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var account = await bankAccountService.GetByIdAsync(GetUserId(), id);
            return Ok(account);
        }

        // POST /api/bank-accounts
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BankAccountCreateDto dto)
        {
            var account = await bankAccountService.CreateAsync(GetUserId(), dto);
            return CreatedAtAction(nameof(GetById), new { id = account.Id }, account);
        }

        // PUT /api/bank-accounts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] BankAccountUpdateDto dto)
        {
            var account = await bankAccountService.UpdateAsync(GetUserId(), id, dto);
            return Ok(account);
        }

        // DELETE /api/bank-accounts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await bankAccountService.DeleteAsync(GetUserId(), id);
            return Ok(new { message = "Conta bancária removida com sucesso." });
        }
    }
}
