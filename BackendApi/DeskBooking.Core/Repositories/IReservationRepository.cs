using DeskBooking.Core.Entities;

namespace DeskBooking.Core.Repositories
{
    public interface IReservationRepository
    {
        Task<Reservation?> GetByIdAsync(int id);
        Task<IEnumerable<Reservation>> GetByUserIdAsync(int userId);
        Task<bool> IsDeskAvailableAsync(int deskId, DateTime startDate, DateTime endDate);
        Task<bool> HasUserOverlappingReservationAsync(int userId, DateTime startDate, DateTime endDate);
        Task<Reservation> AddAsync(Reservation reservation);
        Task RemoveAsync(Reservation reservation); // Cancel entire reservation
        Task UpdateAsync(Reservation reservation); // Cancelled for today
    }
}