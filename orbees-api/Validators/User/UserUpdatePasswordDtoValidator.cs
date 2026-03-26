using Api.Dtos.User;
using FluentValidation;

namespace Api.Validators.User
{
    public class UserUpdatePasswordDtoValidator : AbstractValidator<UserUpdatePasswordDto>
    {
        public UserUpdatePasswordDtoValidator()
        {
            RuleFor(x => x.CurrentPassword)
              .NotEmpty().WithMessage("A senha atual é obrigatória.");

            RuleFor(x => x.NewPassword)
              .NotEmpty().WithMessage("Nova senha é obrigatória.")
              .MinimumLength(8).WithMessage("Senha deve ter no mínimo 8 caracteres.")
              .MaximumLength(256).WithMessage("Senha deve ter no máximo 256 caracteres.")
              .Matches("[A-Z]").WithMessage("Senha deve conter ao menos uma letra maiúscula.")
              .Matches(@"[^\w\s]").WithMessage("Senha deve conter ao menos um caractere especial.")
              .NotEqual(x => x.CurrentPassword).WithMessage("Nova senha deve ser diferente da senha atual.");
        }
    }
}
