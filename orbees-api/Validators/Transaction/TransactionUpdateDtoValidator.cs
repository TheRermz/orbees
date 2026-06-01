using Api.Dtos.Transaction;
using FluentValidation;

namespace Api.Validators.Transaction
{
    public class TransactionUpdateDtoValidator : AbstractValidator<TransactionUpdateDto>
    {
        public TransactionUpdateDtoValidator()
        {
            RuleFor(x => x.Title)
              .MinimumLength(2).WithMessage("O título deve conter no mínimo 2 caracteres.")
              .MaximumLength(256).WithMessage("O título deve conter no máximo 256 caracteres.")
              .Must(title => !System.Text.RegularExpressions.Regex.Matches(title, @"[^a-zA-Z0-9\s]")
                .GroupBy(m => m.Value)
                .Any(g => g.Count() > 5))
              .WithMessage("Nenhum caractere especial pode se repetir mais de 5 vezes.")
              .When(x => x.Title != null);

            RuleFor(x => x.Description)
              .MaximumLength(512).WithMessage("A descrição deve conter no máximo 512 caracteres.")
              .When(x => x.Description != null);

            RuleFor(x => x.GroupCategoryId)
              .NotNull().WithMessage("A categoria do grupo é obrigatória ao vincular a transação a um grupo.")
              .When(x => x.GroupId != null);
        }
    }
}
