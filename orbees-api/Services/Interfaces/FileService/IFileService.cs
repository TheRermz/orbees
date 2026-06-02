namespace Api.Services.Interfaces.FileService
{
    public interface IFileService
    {
        Task<string> SaveProfilePictureAsync(IFormFile file, Guid userId, string username);
        Task DeleteProfilePictureAsync(string path);
    }
}
