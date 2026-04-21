using Api.Dtos.Category;
using Api.Services.Interfaces.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers.Category
{
    [ApiController]
    [Route("api/categories")]
    [Authorize]
    public class CategoryController(ICategoryService categoryService) : ControllerBase
    {
        private Guid GetUserId() =>
          Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
              ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
              ?? throw new UnauthorizedAccessException("Usuário não autenticado")
              );

        // GET /api/categories
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] Guid? groupId)
        {
            var categories = await categoryService.GetAllForUserAsync(GetUserId(), groupId);
            return Ok(categories);
        }

        // GET /api/categories/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var category = await categoryService.GetByIdAsync(GetUserId(), id);
            return Ok(category);
        }

        // POST /api/categories
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDto dto)
        {
            var category = await categoryService.CreateAsync(GetUserId(), dto);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        // PUT /api/categories/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CategoryUpdateDto dto)
        {
            var category = await categoryService.UpdateAsync(GetUserId(), id, dto);
            return Ok(category);
        }

        // DELETE /api/categories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await categoryService.DeleteAsync(GetUserId(), id);
            return Ok(new { message = "Categoria removida com sucesso." });
        }
    }
}
