namespace Api.Dtos.User
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required string Fullname { get; set; }
        public string? ProfilePicturePath { get; set; }
    }
}
