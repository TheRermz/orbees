using Api.Dtos.Bank;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces.Bank;

namespace Api.Services.Bank
{
    public class BankService(IBankRepository bankRepository) : IBankService
    {
        public async Task<IEnumerable<BankReadDto>> GetAllAsync()
        {
            var banks = await bankRepository.GetAllActiveAsync();
            return banks.Select(b => new BankReadDto
            {
                Id = b.Id,
                Name = b.BankName,
                Code = b.BankCode
            });
        }

        public async Task<BankReadDto> GetByIdAsync(int id)
        {
            var bank = await bankRepository.GetByIdAsync(id)
              ?? throw new KeyNotFoundException("Banco não encontrado.");

            return new BankReadDto
            {
                Id = bank.Id,
                Name = bank.BankName,
                Code = bank.BankCode
            };
        }
    }
}
