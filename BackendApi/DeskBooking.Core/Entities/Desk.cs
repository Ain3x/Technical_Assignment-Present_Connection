using DeskBooking.Core.Enums;
namespace DeskBooking.Core.Entities
{
    public class Desk
    {
        public int Id {get;set;}
        public string DeskNumber {get;set;} = string.Empty;
        public DeskStatus status {get;set;}
        public string? MaintenanceMessage {get;set;}
        

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}