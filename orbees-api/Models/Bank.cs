using Api.Models.Common;

namespace Api.Models
{
    public class Bank : AuditableEntity
    {
        public int Id { get; set; }
        public required string BankName { get; set; }
        public required string BankCode { get; set; } // Código COMPE
        public string? Ispb { get; set; }             // ex: 18236120
        public string? CsvHeaderSignature { get; set; }
        public bool IsActive { get; set; } = true;


        public ICollection<BankAccount> BankAccounts { get; set; } = [];
    }
}
