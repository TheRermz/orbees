using Api.Dtos.Group;
using Api.Dtos.GroupMember;
using Api.Dtos.GroupRole;

namespace Api.Services.Interfaces.Groups
{
    public interface IGroupService
    {
        Task<IEnumerable<GroupReadDto>> GetMyGroupsAsync(Guid userId);
        Task<GroupReadDto> GetByIdAsync(Guid userId, Guid groupId);
        Task<IEnumerable<GroupMemberReadDto>> GetMembersAsync(Guid userId, Guid groupId);
        Task<GroupReadDto> CreateAsync(Guid userId, GroupCreateDto dto);
        Task<GroupReadDto> UpdateAsync(Guid userId, Guid groupId, GroupUpdateDto dto);
        Task DeleteAsync(Guid userId, Guid groupId);
        Task<GroupMemberReadDto> AddMemberAsync(Guid userId, Guid groupId, GroupMemberCreateDto dto);
        Task UpdateMemberRoleAsync(Guid userId, Guid groupId, Guid memberId, GroupMemberUpdateDto dto);
        Task RemoveMemberAsync(Guid userId, Guid groupId, Guid memberId);
        Task LeaveGroupAsync(Guid userId, Guid groupId);
        Task<IEnumerable<GroupRoleReadDto>> GetRolesAsync();
    }
}
