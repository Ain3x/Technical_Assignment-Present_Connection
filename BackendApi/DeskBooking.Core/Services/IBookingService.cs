using DeskBooking.Core.Entities;

namespace DeskBooking.Core.Services
{
    public interface IBookingService
    {
        Task<bool> IsDeskAvailableAsync(int deskId, DateTime date);
        Task<bool> CreateReservationAsync(int userId, int deskId, DateTime startDate, DateTime endDate);
        Task<bool> CancelReservationForTodayAsync(int reservationId, int userId);
        Task<bool> CancelEntireReservationAsync(int reservationId, int userId);
    }
}