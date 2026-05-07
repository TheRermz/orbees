using Api.Dtos.Group;
using FluentValidation;

namespace Api.Validators.Group
{
    public class GroupUpdateDtoValidator : AbstractValidator<GroupUpdateDto>
    {
        public GroupUpdateDtoValidator()
        {
            RuleFor(x => x.Name)
              .MinimumLength(3).WithMessage("O nome do grupo deve conter no mínimo 3 caracteres")
              .MaximumLength(128).WithMessage("O nome do grupo deve conter no máximo 128 caracteres")
              .When(x => x.Name != null);

            RuleFor(x => x.Description)
              .MaximumLength(512).WithMessage("A descrição do grupo deve conter no máximo 512 caracteres.")
              .When(x => x.Description != null);
        }
    }
}
