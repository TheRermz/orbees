using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class GroupMemberConfiguration : IEntityTypeConfiguration<GroupMember>
    {
        public void Configure(EntityTypeBuilder<GroupMember> builder)
        {
            builder.ToTable("group_members");

            builder.HasKey(m => m.Id);

            builder.Property(m => m.Id)
              .HasColumnName("id");

            builder.Property(m => m.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(m => m.LeftAt)
              .HasColumnName("left_at")
              .IsRequired(false);

            builder.Property(m => m.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(m => m.UpdatedAt)
              .HasColumnName("updated_at");


            builder.Property(m => m.GroupId)
              .HasColumnName("group_id");


            builder.Property(m => m.GroupRoleId)
              .HasColumnName("group_role_id");


            builder.Property(m => m.UserId)
              .HasColumnName("user_id");

            // FK Group
            builder.HasOne(m => m.Group)
              .WithMany(g => g.Members)
              .HasForeignKey(m => m.GroupId)
              .OnDelete(DeleteBehavior.Cascade);

            // FK User
            builder.HasOne(m => m.User)
              .WithMany(u => u.GroupMembers)
              .HasForeignKey(m => m.UserId)
              .OnDelete(DeleteBehavior.Cascade);

            // FK GroupRole
            builder.HasOne(m => m.GroupRole)
              .WithMany(gr => gr.GroupMembers)
              .HasForeignKey(m => m.GroupRoleId)
              .OnDelete(DeleteBehavior.Restrict);

            // indices
            builder.HasIndex(m => m.UserId);
            builder.HasIndex(m => m.GroupId);
        }
    }
}
