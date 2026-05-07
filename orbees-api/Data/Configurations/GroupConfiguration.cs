using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.ToTable("groups");

            builder.HasKey(g => g.Id);

            builder.Property(g => g.Id)
              .HasColumnName("id");

            builder.Property(g => g.Name)
              .HasColumnName("group_name")
              .IsRequired()
              .HasMaxLength(128);

            builder.Property(g => g.Description)
              .HasColumnName("description")
              .HasMaxLength(512);

            builder.Property(g => g.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(g => g.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(g => g.UpdatedAt)
              .HasColumnName("updated_at");

            builder.HasMany(g => g.Members)
              .WithOne(m => m.Group)
              .HasForeignKey(m => m.GroupId)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
