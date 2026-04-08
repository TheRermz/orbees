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
            var systemCategories = await categoryRepository.GetSystemCategoriesAsync();
            var userCategories = await categoryRepository.GetByUserIdAsync(userId);

            var all = systemCategories.Concat(userCategories);

            if (groupId.HasValue)
            {
                if (!await groupMemberRepository.IsMemberAsync(userId, groupId.Value))
                    throw new UnauthorizedAccessException("Você não faz parte desse grupo.");

                var groupCategories = await categoryRepository.GetByGroupIdAsync(groupId.Value);
                all = all.Concat(groupCategories);
            }

            return all.Select(MapToReadDto);
        }

        private static CategoryReadDto MapToReadDto(Api.Models.Category category) => new()
        {
            Id = category.Id,
            Name = category.Name,
            Icon = category.Icon,
            Color = category.Color,
            IsSystemCategory = category.UserId == null && category.GroupId == null,
            GroupId = category.GroupId,
            GroupName = category.Group?.Name
        };
    }
}
