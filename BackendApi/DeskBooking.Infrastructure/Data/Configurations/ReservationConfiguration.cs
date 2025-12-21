using DeskBooking.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeskBooking.Infrastructure.Data.Configurations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.HasKey(r => r.Id);
            
            builder.Property(r => r.StartDate)
                .IsRequired();
            
            builder.Property(r => r.EndDate)
                .IsRequired();
            
            builder.Property(r => r.CreatedAt)
                .IsRequired();
        }
    }
}