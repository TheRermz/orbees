using Api.Dtos.Group;
using Api.Dtos.GroupMember;
using Api.Dtos.GroupRole;
using Api.Services.Interfaces.Groups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers.Group
{
    [ApiController]
    [Route("api/groups")]
    [Authorize]
    public class GroupController(IGroupService groupService) : ControllerBase
    {
        private Guid GetUserId() =>
          Guid.Parse(User.FindFirstValue(JwtRegisteredClaimNames.Sub)
              ?? User.FindFirstValue(ClaimTypes.NameIdentifier)
              ?? throw new UnauthorizedAccessException("Usuário não autenticado."));

        // GET /api/groups
        [HttpGet]
        public async Task<IActionResult> GetMyGroups()
        {
            var groups = await groupService.GetMyGroupsAsync(GetUserId());
            return Ok(groups);
        }

        // GET /api/groups/{groupId}
        [HttpGet("{groupId}")]
        public async Task<IActionResult> GetById(Guid groupId)
        {
            var group = await groupService.GetByIdAsync(GetUserId(), groupId);
            return Ok(group);
        }

        // GET /api/groups/{groupId}/members
        [HttpGet("{groupId}/members")]
        public async Task<IActionResult> GetMembers(Guid groupId)
        {
            var members = await groupService.GetMembersAsync(GetUserId(), groupId);
            return Ok(members);
        }

        // POST /api/groups
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GroupCreateDto dto)
        {
            var group = await groupService.CreateAsync(GetUserId(), dto);
            return CreatedAtAction(nameof(GetById), new { groupId = group.Id }, group);
        }

        // PUT /api/groups/{groupId}
        [HttpPut("{groupId}")]
        public async Task<IActionResult> Update(Guid groupId, [FromBody] GroupUpdateDto dto)
        {
            var group = await groupService.UpdateAsync(GetUserId(), groupId, dto);
            return Ok(group);
        }

        // DELETE /api/groups/{groupId}
        [HttpDelete("{groupId}")]
        public async Task<IActionResult> Delete(Guid groupId)
        {
            await groupService.DeleteAsync(GetUserId(), groupId);
            return Ok(new { message = "Grupo deletado com sucesso." });
        }

        // POST /api/groups/{groupId}/members
        [HttpPost("{groupId}/members")]
        public async Task<IActionResult> AddMember(Guid groupId, [FromBody] GroupMemberCreateDto dto)
        {
            var member = await groupService.AddMemberAsync(GetUserId(), groupId, dto);
            return CreatedAtAction(nameof(GetMembers), new { groupId }, member);
        }

        // PUT /api/groups/{groupId}/members/{memberId}/role
        [HttpPut("{groupId}/members/{memberId}/role")]
        public async Task<IActionResult> UpdateMembeRole(Guid groupId, Guid memberId, [FromBody] GroupMemberUpdateDto dto)
        {
            await groupService.UpdateMemberRoleAsync(GetUserId(), groupId, memberId, dto);
            return Ok(new { message = "Função do membro alterada com sucesso." });
        }

        // DELETE /api/groups/{groupId}/members/{memberId}
        [HttpDelete("{groupId}/members/{memberId}")]
        public async Task<IActionResult> RemoveMember(Guid groupId, Guid memberId)
        {
            await groupService.RemoveMemberAsync(GetUserId(), groupId, memberId);
            return Ok(new { message = "Membro removido com sucesso." });
        }

        // DELETE /api/groups/{groupId}/leave
        [HttpDelete("{groupId}/leave")]
        public async Task<IActionResult> LeaveGroup(Guid groupId)
        {
            await groupService.LeaveGroupAsync(GetUserId(), groupId);
            return Ok(new { message = "Você saiu do grupo." });
        }

        // GET /api/groups/roles
        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await groupService.GetRolesAsync();
            return Ok(roles);
        }
    }
}
