namespace Api.Dtos.BankAccount
{
    public class BankAccountReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Agency { get; set; }
        public string? AccountNumber { get; set; }
        public string BankName { get; set; } = string.Empty;
        public string BankCode { get; set; } = string.Empty;
    }
}
