namespace DeskBooking.Application.DTOs
{
    public class UserProfileDto : UserDto
    {
        public List<ReservationDto> CurrentReservations { get; set; } = new();
        public List<ReservationDto> PastReservations { get; set; } = new();
    }
}