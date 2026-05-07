using Api.Dtos.Bank;

namespace Api.Services.Interfaces.Bank
{
    public interface IBankService
    {
        Task<IEnumerable<BankReadDto>> GetAllAsync();
        Task<BankReadDto> GetByIdAsync(int id);
    }
}
