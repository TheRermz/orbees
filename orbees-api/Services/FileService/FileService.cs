using Api.Services.Interfaces.FileService;

namespace Api.Services.FileService
{
    public class FileService : IFileService
    {
        private readonly string _uploadPath;

        public FileService()
        {
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "profilePictures");
            Directory.CreateDirectory(_uploadPath);
        }

        public async Task<string> SaveProfilePictureAsync(IFormFile file, Guid userId, string username)
        {
            var allowedExtensions = new[] { ".jpeg", ".jpg", ".png" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(extension))
                throw new InvalidOperationException("Formato de imagem inválido. Escolha entre '.png', '.jpg' ou '.jpeg'.");

            if (file.Length > 10 * 1024 * 1024)
                throw new InvalidOperationException("O tamanho da imagem deve ser de até 10MB.");

            var userFolder = Path.Combine(_uploadPath, username);
            Directory.CreateDirectory(userFolder);

            var fileName = $"{userId}{extension}";
            var filePath = Path.Combine(_uploadPath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"/uploads/profile-pictures/{username}/{fileName}";
        }

        public async void DeleteProfilePictureAsync(string path)
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), path.TrimStart('/'));
            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }
    }
}
