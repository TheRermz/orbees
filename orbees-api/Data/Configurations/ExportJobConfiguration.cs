using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class ExportJobConfiguration : IEntityTypeConfiguration<ExportJob>
    {
        public void Configure(EntityTypeBuilder<ExportJob> builder)
        {
            builder.ToTable("export_jobs");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("id");
            builder.Property(e => e.UserId).HasColumnName("user_id");
            builder.Property(e => e.Format).HasColumnName("format").HasConversion<string>();
            builder.Property(e => e.From).HasColumnName("from_date");
            builder.Property(e => e.To).HasColumnName("to_date");
            builder.Property(e => e.Status).HasColumnName("status").HasConversion<string>();
            builder.Property(e => e.FilePath).HasColumnName("file_path");
            builder.Property(e => e.ErrorMessage).HasColumnName("error_message");
            builder.Property(e => e.CreatedAt).HasColumnName("created_at");
            builder.Property(e => e.UpdatedAt).HasColumnName("updated_at");

            builder.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

