// Validators/User/UserUpdateDtoValidator.cs
using Api.Dtos.User;
using FluentValidation;

namespace Api.Validators.User
{
    public class UserUpdateDtoValidator : AbstractValidator<UserUpdateDto>
    {
        public UserUpdateDtoValidator()
        {
            RuleFor(x => x.Fullname)
                .MinimumLength(3).WithMessage("Nome deve ter no mínimo 3 caracteres.")
                .MaximumLength(256).WithMessage("Nome deve ter no máximo 256 caracteres.")
                .Matches(@"^[a-zA-ZÀ-ÿ\s]+$").WithMessage("Nome não pode conter números ou caracteres especiais.")
                .When(x => x.Fullname != null);

            RuleFor(x => x.Username)
                .MinimumLength(3).WithMessage("Username deve ter no mínimo 3 caracteres.")
                .MaximumLength(64).WithMessage("Username deve ter no máximo 64 caracteres.")
                .Matches("^[a-zA-Z0-9_]+$").WithMessage("Username deve conter apenas letras, números e underscore.")
                .When(x => x.Username != null);

            RuleFor(x => x.Password)
                .MinimumLength(8).WithMessage("Senha deve ter no mínimo 8 caracteres.")
                .MaximumLength(256).WithMessage("Senha deve ter no máximo 128 caracteres.")
                .Matches("[A-Z]").WithMessage("Senha deve conter ao menos uma letra maiúscula.")
                .Matches(@"[!@#$%^&*(),.?\:{}|<>_\-+=\/\\]").WithMessage("Senha deve conter ao menos um caractere especial.")
                .When(x => x.Password != null);
        }
    }
}
