using Api.Dtos.Group;
using FluentValidation;

namespace Api.Validators.Group
{
    public class GroupCreateDtoValidator : AbstractValidator<GroupCreateDto>
    {
        public GroupCreateDtoValidator()
        {
            RuleFor(x => x.Name)
              .NotEmpty().WithMessage("O nome do grupo é obrigatório.")
              .MinimumLength(3).WithMessage("Nome do grupo deve conter no mínimo 3 caracteres.")
              .MaximumLength(128).WithMessage("O nome do grupo deve conter no máximo 128 caracteres.");

            RuleFor(x => x.Description)
              .MaximumLength(512).WithMessage("A descrição do grupo deve conter no máximo 512 caracteres.")
              .When(x => x.Description != null);
        }
    }
}
