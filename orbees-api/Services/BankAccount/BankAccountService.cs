using Api.Dtos.BankAccount;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.BankAccount;

namespace Api.Services.BankAccount
{
    public class BankAccountService(
        IBankAccountRepository bankAccountRepository,
        IBankRepository bankRepository
        ) : IBankAccountService
    {
        public async Task<IEnumerable<BankAccountReadDto>> GetMyAccountsAsync(Guid userId)
        {
            var accounts = await bankAccountRepository.GetByUserIdAsync(userId);
            return accounts.Select(MapToReadDto);
        }

        public async Task<BankAccountReadDto> GetByIdAsync(Guid userId, Guid accountId)
        {
            var account = await bankAccountRepository.GetByIdAndUserIdAsync(accountId, userId)
              ?? throw new KeyNotFoundException("Conta bancária não encontrada");

            return MapToReadDto(account);
        }

        public async Task<BankAccountReadDto> CreateAsync(Guid userId, BankAccountCreateDto dto)
        {
            var bank = await bankRepository.GetByIdAsync(dto.BankId)
              ?? throw new KeyNotFoundException("Banco não encontrado");

            var account = new Api.Models.BankAccount
            {
                Name = dto.Name,
                Agency = dto.Agency,
                AccountNumber = dto.AccountNumber,
                BankId = dto.BankId,
                UserId = userId
            };

            await bankAccountRepository.AddAsync(account);
            await bankAccountRepository.SaveChangesAsync();

            account.Bank = bank;
            return MapToReadDto(account);
        }

        public async Task<BankAccountReadDto> UpdateAsync(Guid userId, Guid accountId, BankAccountUpdateDto dto)
        {
            var account = await bankAccountRepository.GetByIdAndUserIdAsync(accountId, userId)
              ?? throw new KeyNotFoundException("Conta bancária não encontrada");

            if (dto.Name != null)
                account.Name = dto.Name;

            if (dto.Agency != null)
                account.Agency = dto.Agency;

            if (dto.AccountNumber != null)
                account.AccountNumber = dto.AccountNumber;

            if (dto.BankId != null)
            {
                var bank = await bankRepository.GetByIdAsync(dto.BankId.Value)
                  ?? throw new KeyNotFoundException("Banco não encontrado.");

                account.BankId = dto.BankId.Value;
                account.Bank = bank;
            }

            await bankAccountRepository.UpdateAsync(account);
            await bankAccountRepository.SaveChangesAsync();

            return MapToReadDto(account);
        }

        public async Task DeleteAsync(Guid userId, Guid accountId)
        {
            var account = await bankAccountRepository.GetByIdAndUserIdAsync(accountId, userId)
              ?? throw new KeyNotFoundException("Conta bancária não encontrada.");

            await bankAccountRepository.DeleteAsync(account);
            await bankAccountRepository.SaveChangesAsync();
        }

        private static BankAccountReadDto MapToReadDto(Api.Models.BankAccount account) => new()
        {
            Id = account.Id,
            Name = account.Name,
            Agency = account.Agency,
            AccountNumber = account.AccountNumber,
            BankName = account.Bank.BankName,
            BankCode = account.Bank.BankCode
        };
    }
}
