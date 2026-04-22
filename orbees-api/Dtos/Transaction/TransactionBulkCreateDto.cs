namespace Api.Dtos.Transaction
{
    public class TransactionBulkCreateDto
    {
        public required List<TransactionCreateDto> Transactions { get; set; }
    }
}
