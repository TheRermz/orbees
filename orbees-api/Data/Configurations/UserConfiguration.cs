using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
          .HasColumnName("id");

        builder.Property(u => u.Email)
          .IsRequired()
          .HasColumnName("email")
          .HasMaxLength(256);

        builder.Property(u => u.Fullname)
          .IsRequired()
          .HasColumnName("fullname")
          .HasMaxLength(256);

        builder.Property(u => u.Username)
          .IsRequired()
          .HasColumnName("username")
          .HasMaxLength(50);

        builder.Property(u => u.PasswordHash)
          .HasColumnName("password")
          .HasMaxLength(256);

        builder.Property(u => u.EmailConfirmed)
          .HasColumnName("email_confirmed");

        builder.Property(u => u.EmailConfirmationToken)
          .HasColumnName("email_confirmation_token");

        builder.Property(u => u.EmailConfirmationExpiresAt)
          .HasColumnName("email_confirmation_expires_at");

        builder.Property(u => u.PwdResetToken)
          .HasColumnName("pwd_reset_token");

        builder.Property(u => u.PwdResetExpiresAt)
          .HasColumnName("pwd_reset_expires_at");

        builder.Property(u => u.OAuthProvider)
          .HasColumnName("oauth_provider");

        builder.Property(u => u.OAuthProviderId)
          .HasColumnName("oauth_provider_id");

        builder.Property(u => u.IsActive)
          .HasColumnName("is_active");

        builder.Property(u => u.CreatedAt)
          .HasColumnName("created_ad");

        builder.Property(u => u.UpdatedAt)
          .HasColumnName("updated_at");

        builder.HasIndex(u => u.Email)
          .IsUnique()
          .HasDatabaseName("ux_user_email");

        builder.HasIndex(u => u.Username)
          .IsUnique()
          .HasDatabaseName("ux_user_username");
    }
}
