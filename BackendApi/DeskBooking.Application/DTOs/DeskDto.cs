using DeskBooking.Core.Enums;

namespace DeskBooking.Application.DTOs
{
    public class DeskDto
    {
        public int Id { get; set; }
        public string DeskNumber { get; set; } = string.Empty;
        public DeskStatus Status { get; set; }                
        public string? MaintenanceMessage { get; set; }      

        public int? ReservationId { get; set; }
        public string? ReservedByFirstName { get; set; }
        public string? ReservedByLastName { get; set; }
        public string? ReservedByFullName { get; set; }
        public DateTime? ReservationStartDate { get; set; }
        public DateTime? ReservationEndDate { get; set; }

        // Can't compute in frontend so its provided here
        public bool IsReservedByCurrentUser { get; set; }
        public bool IsAvailableForReservation { get; set; }

    }
}