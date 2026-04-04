namespace Api.Dtos.GroupMember
{
    public class GroupMemberCreateDto
    {
        public Guid UserId { get; set; }
        public Guid GroupRoleId { get; set; }
    }
}
