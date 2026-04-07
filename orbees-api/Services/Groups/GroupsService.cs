using Api.Dtos.Group;
using Api.Dtos.GroupMember;
using Api.Dtos.GroupRole;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Groups;

namespace Api.Services.Groups
{
    public class GroupService(
        IGroupRepository groupRepository,
        IGroupMemberRepository groupMemberRepository,
        IGroupRoleRepository groupRoleRepository
        ) : IGroupService
    {
        public async Task<IEnumerable<GroupReadDto>> GetMyGroupsAsync(Guid userId)
        {
            var groups = await groupRepository.GetByUserIdAsync(userId);
            return groups.Select(g => new GroupReadDto
            {
                Id = g.Id,
                Name = g.Name,
                Description = g.Description,
                MemberCount = g.Members.Count(m => m.IsActive),
                CreatedAt = g.CreatedAt
            });
        }

        public async Task<GroupReadDto> GetByIdAsync(Guid userId, Guid groupId)
        {
            var group = await groupRepository.GetByIdWithMembersAsync(groupId)
              ?? throw new KeyNotFoundException("Grupo não encontrado");

            if (!await groupMemberRepository.IsMemberAsync(userId, groupId))
                throw new UnauthorizedAccessException("Você não faz parte deste grupo.");

            return new GroupReadDto
            {
                Id = group.Id,
                Name = group.Name,
                Description = group.Description,
                MemberCount = group.Members.Count(m => m.IsActive),
                CreatedAt = group.CreatedAt
            };
        }

        public async Task<IEnumerable<GroupMemberReadDto>> GetMembersAsync(Guid userId, Guid groupId)
        {
            if (!await groupMemberRepository.IsMemberAsync(userId, groupId))
                throw new UnauthorizedAccessException("Você não faz parte deste grupo.");

            var members = await groupMemberRepository.GetByGroupIdAsync(groupId);
            return members.Select(MapToMemberReadDto);
        }

        public async Task<GroupReadDto> CreateAsync(Guid userId, GroupCreateDto dto)
        {
            if (await groupRepository.UserIsInAnyGroupAsync(userId))
                throw new InvalidOperationException("Você já faz parte de um grupo.");

            var adminRole = await groupRoleRepository.GetByNameAsync("Administrador")
              ?? throw new InvalidOperationException("Função de administrador não encontrada.");

            var group = new Group
            {
                Name = dto.Name,
                Description = dto.Description
            };

            await groupRepository.AddAsync(group);
            await groupRepository.SaveChangesAsync();

            var member = new GroupMember
            {
                GroupId = group.Id,
                UserId = userId,
                GroupRoleId = adminRole.Id
            };

            await groupMemberRepository.AddAsync(member);
            await groupMemberRepository.SaveChangesAsync();

            return new GroupReadDto
            {
                Id = group.Id,
                Name = group.Name,
                Description = group.Description,
                MemberCount = 1,
                CreatedAt = group.CreatedAt
            };
        }

        public async Task<GroupReadDto> UpdateAsync(Guid userId, Guid groupId, GroupUpdateDto dto)
        {
            if (!await groupMemberRepository.IsAdminAsync(userId, groupId))
                throw new UnauthorizedAccessException("Apenas administradores podem editar o grupo.");

            var group = await groupRepository.GetByIdAsync(groupId)
              ?? throw new KeyNotFoundException("Grupo não encontrado.");

            if (dto.Name != null)
                group.Name = dto.Name;

            if (dto.Description != null)
                group.Description = dto.Description;

            await groupRepository.UpdateAsync(group);
            await groupRepository.SaveChangesAsync();

            return new GroupReadDto
            {
                Id = group.Id,
                Name = group.Name,
                Description = group.Description,
                MemberCount = group.Members.Count(m => m.IsActive),
                CreatedAt = group.CreatedAt
            };
        }

        public async Task DeleteAsync(Guid userId, Guid groupId)
        {
            if (!await groupMemberRepository.IsAdminAsync(userId, groupId))
                throw new UnauthorizedAccessException("Apenas administradores podem deletar o grupo.");

            var group = await groupRepository.GetByIdAsync(groupId)
              ?? throw new KeyNotFoundException("Grupo não encontrado");

            await groupRepository.DeleteAsync(group);
            await groupRepository.SaveChangesAsync();
        }

        public async Task<GroupMemberReadDto> AddMemberAsync(Guid userId, Guid groupId, GroupMemberCreateDto dto)
        {
            if (!await groupMemberRepository.IsAdminAsync(userId, groupId))
                throw new UnauthorizedAccessException("Apenas administradores podem adicionar membros ao grupo.");

            if (await groupRepository.UserIsInAnyGroupAsync(dto.UserId))
                throw new InvalidOperationException("Este usuário já participa de um grupo.");

            var role = await groupRoleRepository.GetByIdAsync(dto.GroupRoleId)
              ?? throw new KeyNotFoundException("Função do grupo não encontrada.");

            var member = new GroupMember
            {
                GroupId = groupId,
                UserId = dto.UserId,
                GroupRoleId = dto.GroupRoleId
            };

            await groupMemberRepository.AddAsync(member);
            await groupMemberRepository.SaveChangesAsync();

            var added = await groupMemberRepository.GetByIdAsync(member.Id)
              ?? throw new InvalidOperationException("Erro ao buscar membro adicionado.");

            return MapToMemberReadDto(added);
        }

        public async Task UpdateMemberRoleAsync(Guid userId, Guid groupId, Guid memberId, GroupMemberUpdateDto dto)
        {
            if (!await groupMemberRepository.IsAdminAsync(userId, groupId))
                throw new UnauthorizedAccessException("Apenas administradores podem alterar a função de um membro.");

            var member = await groupMemberRepository.GetByIdAsync(memberId)
              ?? throw new KeyNotFoundException("Membro não encontrado.");

            if (member.UserId == userId)
                throw new InvalidOperationException("Você não pode alterar sua própria função.");

            // admin não pode rebaixar outro admin
            if (member.GroupRole.Name == "Administrador")
                throw new InvalidOperationException("Você não pode alterar a função de outro administrador.");

            var role = await groupRoleRepository.GetByIdAsync(dto.GroupRoleId)
              ?? throw new KeyNotFoundException("Função não encontrada.");

            member.GroupRoleId = dto.GroupRoleId;

            await groupMemberRepository.UpdateAsync(member);
            await groupMemberRepository.SaveChangesAsync();
        }

        public async Task RemoveMemberAsync(Guid userId, Guid groupId, Guid memberId)
        {
            if (!await groupMemberRepository.IsAdminAsync(userId, groupId))
                throw new UnauthorizedAccessException("Apenas administradores podem remover membros do grupo.");

            var member = await groupMemberRepository.GetByIdAsync(memberId)
              ?? throw new KeyNotFoundException("Membro não encontrado.");

            await groupMemberRepository.DeleteAsync(member);
            await groupMemberRepository.SaveChangesAsync();
        }

        public async Task LeaveGroupAsync(Guid userId, Guid groupId)
        {
            var member = await groupMemberRepository.GetByUserAndGroupAsync(userId, groupId)
              ?? throw new KeyNotFoundException("Você não faz parte deste grupo.");

            if (await groupMemberRepository.IsAdminAsync(userId, groupId))
            {
                var members = await groupMemberRepository.GetByGroupIdAsync(groupId);
                var adminCount = members.Count(m => m.IsActive && m.GroupRole.Name == "Administrador");
                if (adminCount == 1)
                    throw new InvalidOperationException("Você é o único administrador. Transfira a administração para outro membro antes de sair.");

                if (members.Count(m => m.IsActive) == 1)
                {
                    var group = await groupRepository.GetByIdAsync(groupId)
                        ?? throw new KeyNotFoundException("Grupo não encontrado.");
                    await groupRepository.DeleteAsync(group);
                }
            }

            await groupMemberRepository.DeleteAsync(member);
            await groupMemberRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<GroupRoleReadDto>> GetRolesAsync()
        {
            var roles = await groupRoleRepository.GetAllAsync();
            return roles.Select(r => new GroupRoleReadDto
            {
                Id = r.Id,
                Name = r.Name
            });
        }

        private static GroupMemberReadDto MapToMemberReadDto(GroupMember member) => new()
        {
            Id = member.Id,
            UserId = member.UserId,
            Username = member.User.Username,
            Fullname = member.User.Fullname,
            Role = member.GroupRole.Name,
            JoinedAt = member.CreatedAt
        };
    }
}
