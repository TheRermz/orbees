namespace Api.Dtos.BankAccount
{
    public class BankAccountCreateDto
    {
        public required string Name { get; set; }
        public string? Agency { get; set; }
        public string? AccountNumber { get; set; }
        public int BankId { get; set; }
    }
}
