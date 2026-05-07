using Api.Dtos.Transaction;
using FluentValidation;

namespace Api.Validators.Transaction
{
    public class TransactionBulkCreateDtoValidator : AbstractValidator<TransactionBulkCreateDto>
    {
        public TransactionBulkCreateDtoValidator()
        {
            RuleFor(x => x.Transactions)
              .NotEmpty().WithMessage("Nenhuma transação a cadastrar.")
              .Must(t => t.Count <= 100).WithMessage("Máximo de 100 transações por vez.");

            RuleForEach(x => x.Transactions)
              .SetValidator(new TransactionCreateDtoValidator());
        }
    }
}
