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

            builder.Property(b => b.BankName)
              .IsRequired()
              .HasMaxLength(128);

            builder.Property(b => b.BankCode)
              .IsRequired()
              .HasMaxLength(10);

            builder.Property(b => b.Ispb)
              .HasMaxLength(8);

            builder.Property(b => b.CsvHeaderSignature)
              .HasMaxLength(512);

            builder.Property(b => b.IsActive)
              .HasDefaultValue(true);

            builder.HasIndex(b => b.BankCode)
              .IsUnique();

            builder.HasMany(b => b.BankAccounts)
              .WithOne(ba => ba.Bank)
              .HasForeignKey(ba => ba.BankId)
              .OnDelete(DeleteBehavior.Restrict);

        }
    }
}

