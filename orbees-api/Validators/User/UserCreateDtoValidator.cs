using Api.Dtos.User;
using FluentValidation;

namespace Api.Validators.User
{
    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(x => x.Email)
              .NotEmpty().WithMessage("Email é obrigatório.")
              .EmailAddress().WithMessage("Insira um email válido.")
              .MaximumLength(256).WithMessage("O email deve conter no máximo 256 caracteres.");

            RuleFor(x => x.Fullname)
              .NotEmpty().WithMessage("Nome é obrigatório.")
              .MinimumLength(3).WithMessage("O nome deve conter no mínimo 3 caracteres.")
              .MaximumLength(256).WithMessage("O nome deve conter no máximo 256 caracteres.")
              .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("O nome não pode conter números ou caracteres especiais.");

            RuleFor(x => x.Username)
              .NotEmpty().WithMessage("O username (Nome de Usuário) é obrigatório.")
              .MinimumLength(3).WithMessage("O username deve conter no mínimo 3 caracteres.")
              .MaximumLength(50).WithMessage("O username deve conter no máximo 256 caracteres.")
              .Matches("^[a-zA-Z0-9_]+$").WithMessage("O username deve conter apenas letras, números e underscore");

            RuleFor(x => x.Password)
              .NotEmpty().WithMessage("A senha é obrigatória.")
              .MinimumLength(8).WithMessage("A senha deve conter pelo menos 8 caracteres.")
              .MaximumLength(256).WithMessage("A senha deve conter no máximo 128 caracteres.")
              .Matches("[A-Z]").WithMessage("A senha deve conter ao menos uma letra maiúscula.")
              .Matches(@"[^\w\s]").WithMessage("Senha deve conter ao menos um caractere especial.")
              .When(x => x.Password != null);
        }
    }
}
