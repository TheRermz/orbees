using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.ToTable("bank_accounts");

            builder.HasKey(ba => ba.Id);

            builder.Property(ba => ba.Id)
              .HasColumnName("id");

            builder.Property(ba => ba.Name)
              .HasColumnName("bank_account_name")
              .IsRequired()
              .HasMaxLength(128);

            builder.Property(ba => ba.Agency)
              .HasColumnName("agency")
              .HasMaxLength(10);

            builder.Property(ba => ba.AccountNumber)
              .HasColumnName("account_number")
              .HasMaxLength(20);

            builder.Property(ba => ba.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(ba => ba.CreatedAt)
              .HasColumnName("created_at");

            builder.Property(ba => ba.UpdatedAt)
              .HasColumnName("updated_at");

            // FK USER
            builder.HasOne(ba => ba.User)
              .WithMany(u => u.BankAccounts)
              .HasForeignKey(ba => ba.UserId)
              .OnDelete(DeleteBehavior.Cascade);

            // FK USER
            builder.HasOne(ba => ba.Bank)
              .WithMany(b => b.BankAccounts)
              .HasForeignKey(ba => ba.BankId)
              .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(ba => ba.UserId);
        }
    }
}
