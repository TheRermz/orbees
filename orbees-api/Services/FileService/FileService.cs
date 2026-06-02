using Api.Services.Interfaces.FileService;

namespace Api.Services.FileService
{
    public class FileService : IFileService
    {
        private readonly string _uploadPath;

        private static readonly string[] AllowedExtensions = [".jpeg", ".jpg", ".png"];
        private static readonly string[] AllowedContentTypes = ["image/jpeg", "image/jpg", "image/png"];

        public FileService()
        {
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "profilePictures");
            Directory.CreateDirectory(_uploadPath);
        }

        public async Task<string> SaveProfilePictureAsync(IFormFile file, Guid userId, string username)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Arquivo inválido ou vazio.");

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(extension))
                throw new InvalidOperationException("Formato de imagem inválido. Escolha entre '.png', '.jpg' ou '.jpeg'.");

            if (!AllowedContentTypes.Contains(file.ContentType.ToLowerInvariant()))
                throw new InvalidOperationException("Tipo de conteúdo inválido. Envie uma imagem JPEG ou PNG.");

            if (file.Length > 10 * 1024 * 1024)
                throw new InvalidOperationException("O tamanho da imagem deve ser de até 10MB.");

            var userFolder = Path.Combine(_uploadPath, username);
            Directory.CreateDirectory(userFolder);

            var fileName = $"{userId}{extension}";
            var filePath = Path.Combine(userFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"/uploads/profile-pictures/{username}/{fileName}";
        }

        public Task DeleteProfilePictureAsync(string path)
        {
            var basePath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "uploads"));
            var fullPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), path.TrimStart('/')));

            if (!fullPath.StartsWith(basePath, StringComparison.OrdinalIgnoreCase))
                return Task.CompletedTask;

            if (File.Exists(fullPath))
                File.Delete(fullPath);

            return Task.CompletedTask;
        }
    }
}
