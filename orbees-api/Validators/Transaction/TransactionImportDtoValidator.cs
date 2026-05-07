using Api.Dtos.Transaction;
using FluentValidation;

namespace Api.Validators.Transaction
{
    public class TransactionImportDtoValidator : AbstractValidator<TransactionImportDto>
    {
        public TransactionImportDtoValidator()
        {
            RuleFor(x => x.Transactions)
              .NotEmpty().WithMessage("Nenhuma transação para importar.")
              .Must(t => t.Count <= 500).WithMessage("Máximo de 500 transações por importação.");

            RuleForEach(x => x.Transactions).ChildRules(t =>
                {
                    t.RuleFor(x => x.Title)
                .NotEmpty().WithMessage("O título é obrigatório.")
                .MaximumLength(256).WithMessage("O título deve conter no máximo 256 caracteres.");

                    t.RuleFor(x => x.Amount)
                .NotEqual(0).WithMessage("O valor não pode ser zero.");

                    t.RuleFor(x => x.TransactionDate)
                .NotEmpty().WithMessage("A data da transação é obrigatória.");

                    t.RuleFor(x => x.GroupCategoryId)
                .NotNull().WithMessage("A categoria do grupo é obrigatória ao vincular transação a um grupo.")
                .When(x => x.GroupId != null);
                });
        }
    }
}
