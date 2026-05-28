using Api.Dtos.Category;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Category;

namespace Api.Services.Category
{
    public class CategoryService(
        ICategoryRepository categoryRepository,
        IGroupMemberRepository groupMemberRepository
        ) : ICategoryService
    {
        public async Task<IEnumerable<CategoryReadDto>> GetAllForUserAsync(Guid userId, Guid? groupId = null)
        {
            if (groupId.HasValue)
            {
                if (!await groupMemberRepository.IsMemberAsync(userId, groupId.Value))
                    throw new UnauthorizedAccessException("Você não faz parte desse grupo.");

                var sysCategories = await categoryRepository.GetSystemCategoriesAsync();
                var groupCategories = await categoryRepository.GetByGroupIdAsync(groupId.Value);
                return sysCategories.Concat(groupCategories).Select(MapToReadDto);
            }

            var systemCategories = await categoryRepository.GetSystemCategoriesAsync();
            var userCategories = await categoryRepository.GetByUserIdAsync(userId);
            return systemCategories.Concat(userCategories).Select(MapToReadDto);
        }

        public async Task<CategoryReadDto> GetByIdAsync(Guid userId, Guid categoryId)
        {
            var category = await categoryRepository.GetByIdAsync(categoryId)
              ?? throw new KeyNotFoundException("Categoria não encontrada.");

            if (category.UserId == null && category.GroupId == null)
                return MapToReadDto(category);

            if (category.UserId == userId)
                return MapToReadDto(category);

            if (category.GroupId.HasValue)
            {
                if (!await groupMemberRepository.IsMemberAsync(userId, category.GroupId.Value))
                    throw new UnauthorizedAccessException("Você não tem acesso a esta categoria.");

                return MapToReadDto(category);
            }
            throw new UnauthorizedAccessException("Você não tem acesso a esta categoria.");
        }

        public async Task<CategoryReadDto> CreateAsync(Guid userId, CategoryCreateDto dto)
        {
            if (await categoryRepository.NameExistsForUserAsync(userId, dto.Name))
                throw new InvalidOperationException("Você já possui uma categoria com este nome.");

            if (dto.GroupId.HasValue)
            {
                if (!await groupMemberRepository.IsMemberAsync(userId, dto.GroupId.Value))
                    throw new UnauthorizedAccessException("Você não faz parte deste grupo");
            }

            var category = new Api.Models.Category
            {
                Name = dto.Name,
                Icon = dto.Icon,
                Color = dto.Color ?? "#262626",
                UserId = dto.GroupId.HasValue ? null : userId,
                GroupId = dto.GroupId
            };

            await categoryRepository.AddAsync(category);
            await categoryRepository.SaveChangesAsync();

            return MapToReadDto(category);
        }

        public async Task<CategoryReadDto> UpdateAsync(Guid userId, Guid categoryId, CategoryUpdateDto dto)
        {
            var category = await categoryRepository.GetByIdAsync(categoryId)
              ?? throw new KeyNotFoundException("Categoria não encontrada");

            if (category.UserId == null && category.GroupId == null)
                throw new InvalidOperationException("Categorias padrões do sistema não podem ser editadas.");

            if (category.UserId != userId && category.GroupId == null)
                throw new UnauthorizedAccessException("Você não tem permissão para alterar esta categoria.");

            if (category.GroupId.HasValue)
            {
                if (!await groupMemberRepository.IsAdminAsync(userId, category.GroupId.Value))
                    throw new UnauthorizedAccessException("Apenas administradores podem alterar categorias do grupo.");
            }

            if (dto.Name != null) category.Name = dto.Name;
            if (dto.Icon != null) category.Icon = dto.Icon;
            if (dto.Color != null) category.Color = dto.Color;


            await categoryRepository.UpdateAsync(category);
            await categoryRepository.SaveChangesAsync();

            return MapToReadDto(category);
        }

        public async Task DeleteAsync(Guid userId, Guid categoryId)
        {
            var category = await categoryRepository.GetByIdAsync(categoryId)
              ?? throw new KeyNotFoundException("Categoria não encontrada.");

            if (category.UserId == null && category.GroupId == null)
                throw new InvalidOperationException("Categorias do sistema não podem ser deletadas.");

            if (category.UserId != userId && category.GroupId == null)
                throw new UnauthorizedAccessException("Você não tem permissão para deletar esta categoria.");

            if (category.GroupId.HasValue)
            {
                if (!await groupMemberRepository.IsAdminAsync(userId, category.GroupId.Value))
                    throw new UnauthorizedAccessException("Apenas administradores podem deletar categorias.");
            }

            await categoryRepository.DeleteAsync(category);
            await categoryRepository.SaveChangesAsync();
        }

        private static CategoryReadDto MapToReadDto(Api.Models.Category category) => new()
        {
            Id = category.Id,
            Name = category.Name,
            Icon = category.Icon,
            Color = category.Color,
            IsSystemCategory = category.UserId == null && category.GroupId == null,
            GroupId = category.GroupId,
            GroupName = category.Group?.Name,
            IsSystem = category.GroupId == null && category.UserId == null
        };
    }
}
