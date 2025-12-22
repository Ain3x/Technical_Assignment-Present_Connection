using DeskBooking.Core.Entities;
using DeskBooking.Core.Repositories;
using DeskBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DeskBooking.Infrastructure.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly BookingDbContext _context;

        public ReservationRepository(BookingDbContext context)
        {
            _context = context;
        }

        public async Task<Reservation?> GetByIdAsync(int id)
        {
            return await _context.Reservations
                .Include(r => r.Desk)
                .Include(r => r.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<bool> IsDeskAvailableAsync(int deskId, DateTime startDate, DateTime endDate)
        {
            return !await _context.Reservations
                .Where(r => r.DeskId == deskId &&
                            r.StartDate <= endDate &&
                            r.EndDate >= startDate)
                .AsNoTracking()
                .AnyAsync();
        }

        public async Task<bool> HasUserOverlappingReservationAsync(int userId, DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Where(r => r.UserId == userId &&
                            r.StartDate <= endDate &&
                            r.EndDate >= startDate)
                .AsNoTracking()
                .AnyAsync();
        }

        public async Task<IEnumerable<Reservation>> GetByUserIdAsync(int userId)
        {
            return await _context.Reservations
                .Include(r => r.Desk)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.StartDate)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Reservation> AddAsync(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            
            return (await GetByIdAsync(reservation.Id))!;
        }

        public async Task UpdateAsync(Reservation reservation)
        {
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveAsync(Reservation reservation)
        {
            if (reservation != null)
            {
                _context.Reservations.Remove(reservation);
                await _context.SaveChangesAsync();
            }
        }
    }
}