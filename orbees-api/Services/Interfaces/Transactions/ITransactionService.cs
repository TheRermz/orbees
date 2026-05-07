using Api.Dtos.Transaction;

namespace Api.Services.Interfaces.Transactions
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionReadDto>> GetMyTransactionsAsync(Guid userId, DateTime? from = null, DateTime? to = null);
        Task<IEnumerable<TransactionReadDto>> GetGroupTransactionsAsync(Guid userId, Guid groupId, DateTime? from = null, DateTime? to = null);
        Task<TransactionReadDto> GetByIdAsync(Guid userId, Guid transactionId);
        Task<TransactionReadDto> CreateAsync(Guid userId, TransactionCreateDto dto);
        Task<IEnumerable<TransactionReadDto>> CreateBulkAsync(Guid userId, TransactionBulkCreateDto dto);
        Task<IEnumerable<TransactionPreviewDto>> PreviewFromOFXAsync(Guid userId, IFormFile file);
        Task<IEnumerable<TransactionPreviewDto>> PreviewFromCSVAsync(Guid userId, IFormFile file, int bankId);
        Task<IEnumerable<TransactionReadDto>> ImportAsync(Guid userId, TransactionImportDto dto);
        Task<TransactionReadDto> UpdateAsync(Guid userId, Guid transactionId, TransactionUpdateDto dto);
        Task DeleteAsync(Guid userId, Guid transactionId);
    }
}
