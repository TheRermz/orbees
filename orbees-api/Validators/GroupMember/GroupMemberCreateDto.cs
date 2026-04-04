using Api.Dtos.GroupMember;
using FluentValidation;

namespace Api.Validators.GroupMember
{
    public class GroupMemberCreateDtoValidator : AbstractValidator<GroupMemberCreateDto>
    {
        public GroupMemberCreateDtoValidator()
        {
            RuleFor(x => x.UserId)
              .NotEmpty().WithMessage("O usuário é obrigatório");

            RuleFor(x => x.GroupRoleId)
              .NotEmpty().WithMessage("A função do integrante é obrigatória.");
        }
    }
}
