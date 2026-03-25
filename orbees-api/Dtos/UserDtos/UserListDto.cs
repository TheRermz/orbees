namespace Api.Dtos.User
{
    public class UserListDto
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Fullname { get; set; }
        public required string Email { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
