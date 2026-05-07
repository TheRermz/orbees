namespace Api.Dtos.Transaction
{
    public class TransactionImportDto
    {
        public Guid? BankAccountId { get; set; }
        public required List<TransactionPreviewDto> Transactions { get; set; }
    }
}
