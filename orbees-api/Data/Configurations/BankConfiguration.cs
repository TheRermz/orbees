using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class BankConfiguration : IEntityTypeConfiguration<Bank>
    {
        public void Configure(EntityTypeBuilder<Bank> builder)
        {
            builder.ToTable("banks");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
              .HasColumnName("id");

            builder.Property(b => b.BankName)
              .HasColumnName("bank_name")
              .IsRequired()
              .HasMaxLength(128);

            builder.Property(b => b.BankCode)
              .HasColumnName("bank_code")
              .IsRequired()
              .HasMaxLength(10);

            builder.Property(b => b.Ispb)
              .HasColumnName("ispb")
              .HasMaxLength(8);

            builder.Property(b => b.CsvHeaderSignature)
              .HasColumnName("csv_header_signature")
              .HasMaxLength(512);

            builder.Property(b => b.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(b => b.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(b => b.UpdatedAt)
              .HasColumnName("updated_at");

            builder.HasIndex(b => b.BankCode)
              .IsUnique();

            builder.HasMany(b => b.BankAccounts)
              .WithOne(ba => ba.Bank)
              .HasForeignKey(ba => ba.BankId)
              .OnDelete(DeleteBehavior.Restrict);

        }
    }
}

