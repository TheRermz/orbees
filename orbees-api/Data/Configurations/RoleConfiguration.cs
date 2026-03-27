using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("roles");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
              .HasColumnName("id");

            builder.Property(r => r.RoleName)
              .HasColumnName("role_name")
              .IsRequired()
              .HasMaxLength(64);

            builder.Property(r => r.Description)
              .HasColumnName("role_description")
              .HasMaxLength(256);

            builder.Property(r => r.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(r => r.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(r => r.UpdatedAt)
              .HasColumnName("updated_at");

            builder.HasIndex(r => r.RoleName)
              .IsUnique();

            builder.HasMany(r => r.UserRoles)
              .WithOne(ur => ur.Role)
              .HasForeignKey(ur => ur.RoleId)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
