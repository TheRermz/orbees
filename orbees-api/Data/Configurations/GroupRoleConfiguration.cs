using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class GroupRoleConfiguration : IEntityTypeConfiguration<GroupRole>
    {
        public void Configure(EntityTypeBuilder<GroupRole> builder)
        {
            builder.ToTable("group_roles");

            builder.HasKey(gr => gr.Id);

            builder.Property(gr => gr.Id)
              .HasColumnName("id");


            builder.Property(gr => gr.Name)
              .HasColumnName("name")
              .IsRequired()
              .HasMaxLength(64);

            builder.Property(gr => gr.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(gr => gr.UpdatedAt)
              .HasColumnName("updated_at");

            builder.Property(gr => gr.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.HasMany(gr => gr.GroupMembers)
              .WithOne(m => m.GroupRole)
              .HasForeignKey(m => m.GroupRoleId)
              .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
