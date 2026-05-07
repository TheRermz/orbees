namespace Api.Dtos.User
{
    public class UserCreateDto
    {
        public required string Email { get; set; }
        public required string Fullname { get; set; }
        public required string Username { get; set; }
        public string? Password { get; set; }
    }
}
