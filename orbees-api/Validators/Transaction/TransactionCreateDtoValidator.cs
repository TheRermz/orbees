using Api.Dtos.Transaction;
using Api.Models.Enums;
using FluentValidation;

namespace Api.Validators.Transaction
{
    public class TransactionCreateDtoValidator : AbstractValidator<TransactionCreateDto>
    {
        public TransactionCreateDtoValidator()
        {
            RuleFor(x => x.Title)
              .NotEmpty().WithMessage("O título é obrigatório.")
              .MinimumLength(2).WithMessage("O título deve conter no mínimo 2 caracteres.")
              .MaximumLength(256).WithMessage("O título deve conter no máximo 256 caracteres.");

            RuleFor(x => x.Description)
              .MaximumLength(512).WithMessage("A descrição deve conter no máximo 512 caracteres.")
              .When(x => x.Description != null);

            RuleFor(x => x.Amount)
              .NotEqual(0).WithMessage("O valor não pode ser zero.")
              .GreaterThan(0).WithMessage("O valor deve ser maior que zero.");

            RuleFor(x => x.TransactionDate)
              .NotEmpty().WithMessage("A data da transação é obrigatória.")
              .LessThanOrEqualTo(DateTime.UtcNow).WithMessage("A data de transação não pode ser no futuro.");

            RuleFor(x => x.Type)
              .IsInEnum().WithMessage("Tipo inválido, use Receita ou Despesa.");

            RuleFor(x => x.MerchantDocument)
              .MaximumLength(18).WithMessage("O CPF/CNPJ deve conter no máximo de 18 caracteres.")
              .When(x => x.MerchantDocument != null);

            RuleFor(x => x.GroupCategoryId)
              .NotNull().WithMessage("A categoria do grupo é obrigatória ao vincular a transação a um grupo.")
              .When(x => x.GroupId != null);
        }
    }
}
