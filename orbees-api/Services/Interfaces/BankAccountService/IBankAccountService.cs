using Api.Dtos.BankAccount;

namespace Api.Services.Interfaces.BankAccount
{
    public interface IBankAccountService
    {
        Task<IEnumerable<BankAccountReadDto>> GetMyAccountsAsync(Guid userId);
        Task<BankAccountReadDto> GetByIdAsync(Guid userId, Guid accountId);
        Task<BankAccountReadDto> CreateAsync(Guid userId, BankAccountCreateDto dto);
        Task<BankAccountReadDto> UpdateAsync(Guid userId, Guid accountId, BankAccountUpdateDto dto);
        Task DeleteAsync(Guid userId, Guid accountId);
    }
}
