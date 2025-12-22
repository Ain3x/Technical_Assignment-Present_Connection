using DeskBooking.Core.Entities;

namespace DeskBooking.Core.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
    }
}