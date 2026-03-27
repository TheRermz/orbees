using Api.Models.Common;

namespace Api.Models
{
    public class User : AuditableEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Email { get; set; }
        public required string Fullname { get; set; }
        public required string Username { get; set; }

        // apesar de usar O Oauth, o usuário pode gerar uma senha própria --> se vem pelo Oauth, esse campo fica null
        public string? PasswordHash { get; set; }

        // ------- EMAIL -------

        public bool EmailConfirmed { get; set; } = false;
        public string? EmailConfirmationToken { get; set; }
        public DateTime? EmailConfirmationExpiresAt { get; set; }

        // ------- PWD RESET -------

        public string? PwdResetToken { get; set; }
        public DateTime? PwdResetExpiresAt { get; set; }

        // ------- OAuth -------
        public string? OAuthProvider { get; set; }
        public string? OAuthProviderId { get; set; } // ID Externo
        public bool IsActive { get; set; } = true;

        // ------- UserPicture -------
        public string? ProfilePicturePath { get; set; }

        // ------- Navegação --------
        public ICollection<BankAccount> BankAccounts { get; set; } = [];
        public ICollection<Category> Categories { get; set; } = [];

    }
}
