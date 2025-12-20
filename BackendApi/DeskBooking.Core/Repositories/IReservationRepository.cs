using DeskBooking.Core.Entities;

namespace DeskBooking.Core.Repositories
{
    public interface IReservationRepository
    {
        Task<Reservation?> GetByIdAsync(int id);
        Task<IEnumerable<Reservation>> GetByUserIdAsync(int userId);
        Task<IEnumerable<Reservation>> GetOverlappingReservationsAsync(int deskId, DateTime startDate, DateTime endDate); // For checking availability
        Task AddAsync(Reservation reservation);
        Task RemoveAsync(Reservation reservation); // Cancel entire reservation
        Task UpdateAsync(Reservation reservation); // Cancelled for today
    }
}