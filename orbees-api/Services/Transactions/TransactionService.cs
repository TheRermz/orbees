using Api.Dtos.Transaction;
using Api.Models;
using Api.Models.Enums;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Transactions;
using Api.Services.Interfaces.ExtractReader;

namespace Api.Services.Transactions
{
    public class TransactionService(
          ITransactionRepository transactionRepository,
          ICategoryRepository categoryRepository,
          IGroupMemberRepository groupMemberRepository,
          IBankAccountRepository bankAccountRepository,
          IExtractReaderService extractReaderService) : ITransactionService
    {

        public async Task<IEnumerable<TransactionReadDto>> GetMyTransactionsAsync(Guid userId, DateTime? from = null, DateTime? to = null)
        {
            var transactions = await transactionRepository.GetByUserIdAsync(userId, from, to);
            return transactions.Select(MapToReadDto);
        }

        public async Task<IEnumerable<TransactionReadDto>> GetGroupTransactionsAsync(Guid userId, Guid groupId, DateTime? from = null, DateTime? to = null)
        {
            if (!await groupMemberRepository.IsMemberAsync(userId, groupId))
                throw new UnauthorizedAccessException("Você não faz parte deste grupo.");

            var transactions = await transactionRepository.GetByGroupIdAsync(groupId, from, to);
            return transactions.Select(MapToReadDto);
        }

        public async Task<TransactionReadDto> GetByIdAsync(Guid userId, Guid transactionId)
        {
            var transaction = await transactionRepository.GetByIdAndUserIdAsync(transactionId, userId)
                ?? throw new KeyNotFoundException("Transação não encontrada.");

            return MapToReadDto(transaction);
        }

        public async Task<TransactionReadDto> CreateAsync(Guid userId, TransactionCreateDto dto)
        {
            await ValidateTransactionDependenciesAsync(userId, dto.BankAccountId, dto.GroupId, dto.CategoryId, dto.GroupCategoryId);

            var transaction = new Transaction
            {
                Title = dto.Title,
                OriginalDescription = dto.Title,
                Description = dto.Description,
                Amount = dto.Amount,
                TransactionDate = DateTime.SpecifyKind(dto.TransactionDate, DateTimeKind.Utc),
                Type = dto.Type,
                Origin = TransactionOrigin.Manual,
                MerchantDocument = dto.MerchantDocument,
                UserId = userId,
                BankAccountId = dto.BankAccountId,
                CategoryId = dto.CategoryId,
                GroupId = dto.GroupId,
                GroupCategoryId = dto.GroupCategoryId
            };

            await transactionRepository.AddAsync(transaction);
            await transactionRepository.SaveChangesAsync();

            var created = await transactionRepository.GetByIdAndUserIdAsync(transaction.Id, userId)
                ?? throw new InvalidOperationException("Erro ao buscar transação criada.");

            return MapToReadDto(created);
        }

        public async Task<IEnumerable<TransactionReadDto>> CreateBulkAsync(Guid userId, TransactionBulkCreateDto dto)
        {
            var transactions = new List<Transaction>();

            foreach (var item in dto.Transactions)
            {
                await ValidateTransactionDependenciesAsync(userId, item.BankAccountId, item.GroupId, item.CategoryId, item.GroupCategoryId);

                transactions.Add(new Transaction
                {
                    Title = item.Title,
                    OriginalDescription = item.Title,
                    Description = item.Description,
                    Amount = item.Amount,
                    TransactionDate = DateTime.SpecifyKind(item.TransactionDate, DateTimeKind.Utc),
                    Type = item.Type,
                    Origin = TransactionOrigin.Manual,
                    MerchantDocument = item.MerchantDocument,
                    UserId = userId,
                    BankAccountId = item.BankAccountId,
                    CategoryId = item.CategoryId,
                    GroupId = item.GroupId,
                    GroupCategoryId = item.GroupCategoryId
                });
            }

            await transactionRepository.AddRangeAsync(transactions);
            await transactionRepository.SaveChangesAsync();

            var ids = transactions.Select(t => t.Id).ToList();
            var created = await transactionRepository.GetByUserIdAsync(userId);
            return created.Where(t => ids.Contains(t.Id)).Select(MapToReadDto);
        }

        public async Task<IEnumerable<TransactionPreviewDto>> PreviewFromOFXAsync(Guid userId, IFormFile file)
        {
            var preview = await extractReaderService.ReadOFXAsync(file);
            return await SuggestCategoriesAsync(userId, preview);
        }

        public async Task<IEnumerable<TransactionPreviewDto>> PreviewFromCSVAsync(Guid userId, IFormFile file, int bankId)
        {
            var preview = await extractReaderService.ReadCSVAsync(file, bankId);
            return await SuggestCategoriesAsync(userId, preview);
        }

        public async Task<IEnumerable<TransactionReadDto>> ImportAsync(Guid userId, TransactionImportDto dto)
        {
            var transactions = new List<Transaction>();

            foreach (var item in dto.Transactions)
            {
                var suggestedCategory = await SuggestCategoryAsync(userId, item.OriginalDescription ?? item.Title);

                transactions.Add(new Transaction
                {
                    Title = item.Title,
                    OriginalDescription = item.OriginalDescription ?? item.Title,
                    Amount = item.Amount,
                    TransactionDate = DateTime.SpecifyKind(item.TransactionDate, DateTimeKind.Utc),
                    Type = item.Type,
                    Origin = TransactionOrigin.OFX,
                    MerchantDocument = item.MerchantDocument,
                    UserId = userId,
                    BankAccountId = dto.BankAccountId,
                    CategoryId = item.CategoryId ?? suggestedCategory,
                    GroupId = item.GroupId,
                    GroupCategoryId = item.GroupCategoryId
                });
            }

            await transactionRepository.AddRangeAsync(transactions);
            await transactionRepository.SaveChangesAsync();

            var ids = transactions.Select(t => t.Id).ToList();
            var created = await transactionRepository.GetByUserIdAsync(userId);
            return created.Where(t => ids.Contains(t.Id)).Select(MapToReadDto);
        }

        public async Task<TransactionReadDto> UpdateAsync(Guid userId, Guid transactionId, TransactionUpdateDto dto)
        {
            var transaction = await transactionRepository.GetByIdAndUserIdAsync(transactionId, userId)
                ?? throw new KeyNotFoundException("Transação não encontrada.");

            if (dto.Title != null) transaction.Title = dto.Title;
            if (dto.Description != null) transaction.Description = dto.Description;
            if (dto.CategoryId != null) transaction.CategoryId = dto.CategoryId;

            // categoria do grupo só pode ser alterada se o vínculo ainda estiver ativo
            if (dto.GroupCategoryId != null)
            {
                if (!transaction.GroupLinkActive)
                    throw new InvalidOperationException("O vínculo com o grupo foi encerrado. A categoria do grupo não pode ser alterada.");
                transaction.GroupCategoryId = dto.GroupCategoryId;
            }

            if (dto.GroupId != null && transaction.GroupId == null)
            {
                if (!await groupMemberRepository.IsMemberAsync(userId, dto.GroupId.Value))
                    throw new UnauthorizedAccessException("Você não faz parte deste grupo.");
                transaction.GroupId = dto.GroupId;
            }

            await transactionRepository.UpdateAsync(transaction);
            await transactionRepository.SaveChangesAsync();

            var updated = await transactionRepository.GetByIdAndUserIdAsync(transactionId, userId)
                ?? throw new InvalidOperationException("Erro ao buscar transação atualizada.");

            return MapToReadDto(updated);
        }

        public async Task DeleteAsync(Guid userId, Guid transactionId)
        {
            var transaction = await transactionRepository.GetByIdAndUserIdAsync(transactionId, userId)
                ?? throw new KeyNotFoundException("Transação não encontrada.");

            await transactionRepository.DeleteAsync(transaction);
            await transactionRepository.SaveChangesAsync();
        }

        private async Task<Guid?> SuggestCategoryAsync(Guid userId, string description)
        {
            var similar = await transactionRepository.GetSimilarTransactionsAsync(userId, description, limit: 5);
            if (!similar.Any()) return null;

            return similar
                .Where(t => t.CategoryId != null)
                .GroupBy(t => t.CategoryId)
                .OrderByDescending(g => g.Count())
                .FirstOrDefault()?.Key;
        }

        private async Task<IEnumerable<TransactionPreviewDto>> SuggestCategoriesAsync(Guid userId, IEnumerable<TransactionPreviewDto> preview)
        {
            var result = preview.ToList();
            foreach (var item in result)
            {
                var suggested = await SuggestCategoryAsync(userId, item.OriginalDescription ?? item.Title);
                if (suggested.HasValue)
                {
                    var category = await categoryRepository.GetByIdAsync(suggested.Value);
                    item.SuggestedCategoryId = suggested;
                    item.SuggestedCategoryName = category?.Name;
                }
            }
            return result;
        }

        private async Task ValidateTransactionDependenciesAsync(
            Guid userId,
            Guid? bankAccountId,
            Guid? groupId,
            Guid? categoryId,
            Guid? groupCategoryId)
        {
            if (bankAccountId.HasValue)
            {
                if (!await bankAccountRepository.UserHasAccountAsync(userId, bankAccountId.Value))
                    throw new KeyNotFoundException("Conta bancária não encontrada.");
            }

            if (groupId.HasValue)
            {
                if (!await groupMemberRepository.IsMemberAsync(userId, groupId.Value))
                    throw new UnauthorizedAccessException("Você não faz parte deste grupo.");

                if (!groupCategoryId.HasValue)
                    throw new InvalidOperationException("Categoria do grupo é obrigatória ao vincular a um grupo.");
            }

            if (categoryId.HasValue)
            {
                var category = await categoryRepository.GetByIdAsync(categoryId.Value)
                    ?? throw new KeyNotFoundException("Categoria não encontrada.");

                if (category.UserId != null && category.UserId != userId)
                    throw new UnauthorizedAccessException("Categoria não pertence ao usuário.");
            }
        }

        private static TransactionReadDto MapToReadDto(Transaction t) => new()
        {
            Id = t.Id,
            Title = t.Title,
            OriginalDescription = t.OriginalDescription,
            Description = t.Description,
            Amount = t.Amount,
            TransactionDate = t.TransactionDate,
            Type = t.Type,
            TransactionOrigin = t.Origin,
            MerchantDocument = t.MerchantDocument,
            CategoryId = t.CategoryId,
            CategoryName = t.Category?.Name,
            CategoryColor = t.Category?.Color,
            CategoryIcon = t.Category?.Icon,
            GroupCategoryId = t.GroupCategoryId,
            GroupCategoryName = t.GroupCategory?.Name,
            GroupId = t.GroupId,
            GroupName = t.Group?.Name,
            GroupLinkActive = t.GroupLinkActive,
            BankAccountId = t.BankAccountId,
            BankAccountName = t.BankAccount?.Name,
            CreatedAt = t.CreatedAt,
            UpdatedAt = t.UpdatedAt
        };
    }
}
