using System.ComponentModel.DataAnnotations;

namespace DeskBooking.Application.DTOs
{
    public class CreateReservationRequest
    {
        [Required]
        public int DeskId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public DateTime StartDate { get; set; }
        
        [Required]
        public DateTime EndDate { get; set; }
    }
}