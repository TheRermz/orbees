using Api.Dtos.BankAccount;
using FluentValidation;

namespace Api.Validators.BankAccount
{
    public class BankAccountCreateDtoValidator : AbstractValidator<BankAccountCreateDto>
    {
        public BankAccountCreateDtoValidator()
        {
            RuleFor(x => x.Name)
              .NotEmpty().WithMessage("Nome da conta é obrigatório.")
              .MaximumLength(128).WithMessage("Nome da conta deve conter até 128 caracteres.");

            RuleFor(x => x.Agency)
              .MaximumLength(10).WithMessage("Agência deve conter no máximo 10 caracteres.")
              .When(x => x.Agency != null);

            RuleFor(x => x.AccountNumber)
              .MaximumLength(20).WithMessage("O número da conta deve conter no máximo 20 caracteres.")
              .When(x => x.AccountNumber != null);

            RuleFor(x => x.BankId)
              .GreaterThan(0).WithMessage("Banco inválido.");
        }
    }
}
