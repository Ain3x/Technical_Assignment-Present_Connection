using DeskBooking.Core.Entities;
using DeskBooking.Core.Repositories;
using DeskBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DeskBooking.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BookingDbContext _context;

        public UserRepository(BookingDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetByIdWithReservationsAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Reservations)
                    .ThenInclude(r => r.Desk)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Users.AnyAsync(u => u.Id == id);
        }
    }
}