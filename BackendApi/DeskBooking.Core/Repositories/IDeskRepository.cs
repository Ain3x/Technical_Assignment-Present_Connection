using DeskBooking.Core.Entities;

namespace DeskBooking.Core.Repositories
{
    public interface IDeskRepository
    {
        Task<IEnumerable<Desk>> GetAllAsync();
        
    }
}