using DeskBooking.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeskBooking.Infrastructure.Data.Configurations
{
    public class DeskConfiguration : IEntityTypeConfiguration<Desk>
    {
        public void Configure(EntityTypeBuilder<Desk> builder)
        {
            builder.HasKey(d => d.Id);
            
            builder.Property(d => d.DeskNumber)
                .IsRequired()
                .HasMaxLength(50);
            
            builder.Property(d => d.MaintenanceMessage)
                .HasMaxLength(500);
            
            builder.HasMany(d => d.Reservations)
                .WithOne(r => r.Desk)
                .HasForeignKey(r => r.DeskId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}