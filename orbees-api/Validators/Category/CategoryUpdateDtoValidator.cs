using Api.Dtos.Category;
using FluentValidation;

namespace Api.Validators.Category
{
    public class CategoryUpdateDtoValidator : AbstractValidator<CategoryUpdateDto>
    {
        public CategoryUpdateDtoValidator()
        {
            RuleFor(x => x.Name)
              .NotEmpty().WithMessage("O nome da categoria é obrigatório.")
              .MinimumLength(2).WithMessage("O nome da categoria deve conter no mínimo 2 caracteres.")
              .MaximumLength(128).WithMessage("O nome da categoria deve conter no máximo 128 caracteres.")
              .When(x => x.Name != null);

            RuleFor(x => x.Icon)
              .MaximumLength(64).WithMessage("O ícone deve conter no máximo 64 caracteres.")
              .When(x => x.Icon != null);

            RuleFor(x => x.Color)
              .MaximumLength(7).WithMessage("A cor deve conter no máximo 7 caracteres.")
              .Matches("^#[0-9A-Fa-f]{6}$").WithMessage("A cor deve estar no formato hexadecimal (#RRGGBB)")
              .When(x => x.Color != null);
        }
    }
}
