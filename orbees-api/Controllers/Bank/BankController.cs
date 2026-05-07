using Api.Services.Interfaces.Bank;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Bank
{
    [ApiController]
    [Route("api/banks")]
    [Authorize]
    public class BankController(IBankService bankService) : ControllerBase
    {
        // GET /api/banks
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var banks = await bankService.GetAllAsync();
            return Ok(banks);
        }

        // GET /api/banks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var bank = await bankService.GetByIdAsync(id);
            return Ok(bank);
        }
    }
}
