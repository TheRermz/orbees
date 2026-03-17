using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    [Table("Users")]
    public class User
    {
        [Column("Id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Column("Email")]
        [Required, MaxLength(256)]
        public required string Email { get; set; }

        [Column("Fullname")]
        [Required, MaxLength(256)]
        public required string Fullname { get; set; }

        [Column("Username")]
        [Required, MaxLength(64)]
        public required string Username { get; set; }

        // apesar de usar O Oauth, o usuário pode gerar uma senha própria --> se vem pelo Oauth, esse campo fica null
        [Column("Password")]
        public string? PasswordHash { get; set; }

        // ------- EMAIL -------

        [Column("EmailConfirmed")]
        public bool EmailConfirmed { get; set; } = false;

        [Column("EmailConfirmationToken")]
        public string? EmailConfirmationToken { get; set; }

        [Column("EmailConfirmationExpiresAt")]
        public DateTime? EmailConfirmationExpiresAt { get; set; }

        // ------- PWD RESET -------

        [Column("PasswordResetToken")]
        public string? PwdResetToken { get; set; }

        [Column("PasswordResetExpiresAt")]
        public DateTime? PwdResetExpiresAt { get; set; }

        // ------- OAuth -------

        [Column("OAuthProvider")]
        public string? OAuthProvider { get; set; }

        [Column("ProviderId")]
        public string? OAuthProviderId { get; set; } // ID Externo


        [Column("IsActive")]
        public bool IsActive { get; set; } = true;

        // ------- Auditoria -------

        [Column("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }
    }
}
