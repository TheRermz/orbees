using Api.Models;
using Api.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("transactions");

            builder.HasKey(t => t.Id);

            builder.Property(t => t.Id)
              .HasColumnName("id");

            builder.Property(t => t.Title)
              .HasColumnName("title")
              .IsRequired()
              .HasMaxLength(256);

            builder.Property(t => t.OriginalDescription)
              .HasColumnName("original_description")
              .HasMaxLength(512);

            builder.Property(t => t.Description)
              .HasColumnName("description")
              .HasMaxLength(512);

            builder.Property(t => t.Amount)
              .HasColumnName("amount")
              .HasPrecision(18, 2);

            builder.Property(t => t.TransactionDate)
              .HasColumnName("transaction_date");

            builder.Property(t => t.Type)
              .HasColumnName("type")
              .HasConversion<string>();

            builder.Property(t => t.Origin)
              .HasColumnName("origin")
              .HasConversion<string>();

            builder.Property(t => t.MerchantDocument)
              .HasColumnName("merchant_document")
              .HasMaxLength(18); // CPF (14) ou CNPJ (18)

            builder.Property(t => t.IsActive)
              .HasColumnName("is_active")
              .HasDefaultValue(true);

            builder.Property(t => t.GroupLinkActive)
              .HasColumnName("group_link_active")
              .HasDefaultValue(true);

            builder.Property(t => t.UserId)
              .HasColumnName("user_id");

            builder.Property(t => t.BankAccountId)
                .HasColumnName("bank_account_id");

            builder.Property(t => t.CategoryId)
                .HasColumnName("category_id");

            builder.Property(t => t.GroupCategoryId)
                .HasColumnName("group_category_id");

            builder.Property(t => t.GroupId)
                .HasColumnName("group_id");

            builder.Property(t => t.CreatedAt)
                .HasColumnName("created_at");

            builder.Property(t => t.UpdatedAt)
                .HasColumnName("updated_at");

            builder.HasOne(t => t.User)
              .WithMany(u => u.Transactions)
              .HasForeignKey(t => t.UserId)
              .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(t => t.BankAccount)
              .WithMany()
              .HasForeignKey(t => t.BankAccountId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(t => t.Category)
              .WithMany()
              .HasForeignKey(t => t.CategoryId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(t => t.GroupCategory)
              .WithMany()
              .HasForeignKey(t => t.GroupCategoryId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(t => t.Group)
              .WithMany()
              .HasForeignKey(t => t.GroupId)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(t => t.UserId);
            builder.HasIndex(t => t.GroupId);
            builder.HasIndex(t => t.TransactionDate);
            builder.HasIndex(t => t.OriginalDescription);
        }
    }
}
