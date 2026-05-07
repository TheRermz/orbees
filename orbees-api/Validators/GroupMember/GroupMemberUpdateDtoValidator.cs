using Api.Dtos.GroupMember;
using FluentValidation;

namespace Api.Validators.GroupMember
{
    public class GroupMemberUpdateDtoValidator : AbstractValidator<GroupMemberUpdateDto>
    {
        public GroupMemberUpdateDtoValidator()
        {
            RuleFor(x => x.GroupRoleId)
              .NotEmpty().WithMessage("A função do integrante é obrigatória.");
        }
    }
}
