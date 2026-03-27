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

            builder.Property(c => c.Name)
              .IsRequired()
              .HasMaxLength(128);

            builder.Property(c => c.Icon)
              .HasMaxLength(64);

            builder.Property(c => c.Color)
              .HasMaxLength(7);

            builder.Property(c => c.IsActive)
              .HasDefaultValue(true);

            // FK User -- nullable
            builder.HasOne(c => c.User)
              .WithMany(c => c.Categories)
              .HasForeignKey(c => c.UserId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(c => c.UserId);
        }
    }
}
