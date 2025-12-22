using DeskBooking.Core.Entities;

namespace DeskBooking.Core.Services
{
    public interface IBookingService
    {
        Task<Reservation> CreateReservationAsync(int userId, int deskId, DateTime startDate, DateTime endDate);
        Task<bool> CancelReservationForTodayAsync(int reservationId, int userId);
        Task<bool> CancelEntireReservationAsync(int reservationId, int userId);
    }
}