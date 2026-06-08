using Api.Dtos.Transaction;
using Api.Services.Interfaces.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers.Transaction
{
    [ApiController]
    [Route("api/transactions")]
    [Authorize]
    public class TransactionController(ITransactionService transactionService) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new UnauthorizedAccessException("Usuário não autenticado."));

        // GET /api/transactions
        [HttpGet]
        public async Task<IActionResult> GetMyTransactions(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null,
            [FromQuery] string? search = null,
            [FromQuery] Guid? categoryId = null,
            [FromQuery] int? type = null)
        {
            var result = await transactionService.GetMyTransactionsAsync(GetUserId(), page, pageSize, from, to, search, categoryId, type);
            return Ok(result);
        }

        // GET /api/transactions/group/{groupId}
        [HttpGet("group/{groupId}")]
        public async Task<IActionResult> GetGroupTransactions(
            Guid groupId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null,
            [FromQuery] string? search = null,
            [FromQuery] Guid? categoryId = null,
            [FromQuery] int? type = null)
        {
            var result = await transactionService.GetGroupTransactionsAsync(GetUserId(), groupId, page, pageSize, from, to, search, categoryId, type);
            return Ok(result);
        }

        // GET /api/transactions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var transaction = await transactionService.GetByIdAsync(GetUserId(), id);
            return Ok(transaction);
        }

        // POST /api/transactions
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TransactionCreateDto dto)
        {
            var transaction = await transactionService.CreateAsync(GetUserId(), dto);
            return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, transaction);
        }

        // POST /api/transactions/bulk
        [HttpPost("bulk")]
        public async Task<IActionResult> CreateBulk([FromBody] TransactionBulkCreateDto dto)
        {
            var transactions = await transactionService.CreateBulkAsync(GetUserId(), dto);
            return Ok(transactions);
        }

        // POST /api/transactions/preview/ofx
        [HttpPost("preview/ofx")]
        public async Task<IActionResult> PreviewOFX(IFormFile file)
        {
            var preview = await transactionService.PreviewFromOFXAsync(GetUserId(), file);
            return Ok(preview);
        }

        // POST /api/transactions/preview/csv/{bankId}
        [HttpPost("preview/csv/{bankId}")]
        public async Task<IActionResult> PreviewCSV(IFormFile file, int bankId)
        {
            var preview = await transactionService.PreviewFromCSVAsync(GetUserId(), file, bankId);
            return Ok(preview);
        }

        // POST /api/transactions/preview/xls/{bankId}
        [HttpPost("preview/xls/{bankId}")]
        public async Task<IActionResult> PreviewXLS(IFormFile file, int bankId)
        {
            var preview = await transactionService.PreviewFromXLSAsync(GetUserId(), file, bankId);
            return Ok(preview);
        }

        // POST /api/transactions/import
        [HttpPost("import")]
        public async Task<IActionResult> Import([FromBody] TransactionImportDto dto)
        {
            var transactions = await transactionService.ImportAsync(GetUserId(), dto);
            return Ok(transactions);
        }

        // PUT /api/transactions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TransactionUpdateDto dto)
        {
            var transaction = await transactionService.UpdateAsync(GetUserId(), id, dto);
            return Ok(transaction);
        }

        // DELETE /api/transactions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await transactionService.DeleteAsync(GetUserId(), id);
            return Ok(new { message = "Transação removida com sucesso." });
        }
    }
}
