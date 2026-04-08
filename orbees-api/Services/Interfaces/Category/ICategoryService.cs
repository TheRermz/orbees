using Api.Dtos.Category;

namespace Api.Services.Interfaces.Category
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryReadDto>> GetAllForUserAsync(Guid userId, Guid? groupId = null);
        Task<CategoryReadDto> GetByIdAsync(Guid userId, Guid categoryId);
        Task<CategoryReadDto> CreateAsync(Guid userId, CategoryCreateDto dto);
        Task<CategoryReadDto> UpdateAsync(Guid userId, CategoryUpdateDto dto);
        Task DeleteAsync(Guid userId, Guid groupId);
    }
}
