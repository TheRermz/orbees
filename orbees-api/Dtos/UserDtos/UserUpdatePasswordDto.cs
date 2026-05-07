namespace Api.Dtos.User
{
    public class UserUpdatePasswordDto
    {
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
