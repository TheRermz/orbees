using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("categories");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
              .HasColumnName("id");

            builder.Property(c => c.Name)
              .HasColumnName("category_name")
              .IsRequired()
              .HasMaxLength(128);

            builder.Property(c => c.Icon)
              .HasColumnName("category_icon")
              .HasMaxLength(64);

            builder.Property(c => c.Color)
              .HasColumnName("category_color")
              .HasMaxLength(7)
              .HasDefaultValue("#262626");

            builder.Property(c => c.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(c => c.GroupId)
              .HasColumnName("group_id");

            builder.Property(c => c.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(c => c.UpdatedAt)
              .HasColumnName("updated_at");

            // FK User -- nullable
            builder.HasOne(c => c.User)
              .WithMany(c => c.Categories)
              .HasForeignKey(c => c.UserId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.Cascade);

            // FK Group -- nullable
            builder.HasOne(c => c.Group)
              .WithMany()
              .HasForeignKey(c => c.GroupId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(c => c.UserId);
        }
    }
}
