using Api.Dtos.Transaction;

namespace Api.Services.Interfaces.ExtractReader
{
    public interface IExtractReaderService
    {
        Task<IEnumerable<TransactionPreviewDto>> ReadOFXAsync(IFormFile file);
        Task<IEnumerable<TransactionPreviewDto>> ReadCSVAsync(IFormFile file, int bankId);
        Task<IEnumerable<TransactionPreviewDto>> ReadXLSAsync(IFormFile file, int bankId);
    }
}
