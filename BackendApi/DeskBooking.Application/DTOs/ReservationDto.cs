namespace DeskBooking.Application.DTOs
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int DeskId { get; set; }
        public string DeskNumber { get; set; } = string.Empty;

        public int UserId { get; set; }
        public string UserFirstName { get; set; } = string.Empty;
        public string UserLastName { get; set; } = string.Empty;
        public string UserFullName => $"{UserFirstName} {UserLastName}";

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime CreatedAt { get; set; }
        

    }
}