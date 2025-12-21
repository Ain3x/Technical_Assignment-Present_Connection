using DeskBooking.Core.Entities;
using DeskBooking.Core.Repositories;
using DeskBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DeskBooking.Infrastructure.Repositories
{
    public class DeskRepository : IDeskRepository
    {
        private readonly BookingDbContext _context;

        public DeskRepository(BookingDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Desk>> GetAllAsync()
        {
            return await _context.Desks
                .Include(d => d.Reservations) // No more filtering
                    .ThenInclude(r => r.User)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Desk?> GetByIdAsync(int id)
        {
            return await _context.Desks
                .Include(d => d.Reservations) // No more filtering
                    .ThenInclude(r => r.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.Id == id);
        }
    }
}