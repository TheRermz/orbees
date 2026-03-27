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

            builder.Property(r => r.RoleName)
              .IsRequired()
              .HasMaxLength(64);

            builder.Property(r => r.Description)
              .HasMaxLength(256);

            builder.Property(r => r.IsActive)
              .HasDefaultValue(true);

            builder.HasIndex(r => r.RoleName)
              .IsUnique();

            builder.HasMany(r => r.UserRoles)
              .WithOne(ur => ur.Role)
              .HasForeignKey(ur => ur.RoleId)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
