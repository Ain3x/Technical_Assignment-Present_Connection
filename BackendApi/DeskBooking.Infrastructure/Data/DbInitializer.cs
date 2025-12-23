using DeskBooking.Core.Entities;
using DeskBooking.Core.Enums;

namespace DeskBooking.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static void Initialize(BookingDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
                return;

            // --------------------
            // Users
            // --------------------
            var users = new List<User>
            {
                new User { FirstName = "John", LastName = "Doe" },
                new User { FirstName = "Jane", LastName = "Smith" },
                new User { FirstName = "Alice", LastName = "Johnson" }
            };

            context.Users.AddRange(users);
            context.SaveChanges();

            // --------------------
            // Desks
            // --------------------
            var desks = new List<Desk>();

            for (int i = 1; i <= 10; i++)
            {
                bool isMaintenance = i > 8; // desks 9–10

                desks.Add(new Desk
                {
                    DeskNumber = $"D-{i:000}",
                    Status = isMaintenance ? DeskStatus.Maintenance : DeskStatus.Open,
                    MaintenanceMessage = isMaintenance ? "Undergoing repairs" : null
                });
            }

            context.Desks.AddRange(desks);
            context.SaveChanges();

            // --------------------
            // Reservations
            // --------------------
            var reservations = new List<Reservation>
            {
                new Reservation
                {
                    DeskId = desks[0].Id,
                    UserId = users[0].Id,
                    StartDate = DateTime.Today.AddDays(5),
                    EndDate = DateTime.Today.AddDays(6),
                    CreatedAt = DateTime.UtcNow
                },
                new Reservation
                {
                    DeskId = desks[1].Id,
                    UserId = users[1].Id,
                    StartDate = DateTime.Today.AddDays(1),
                    EndDate = DateTime.Today.AddDays(3),
                    CreatedAt = DateTime.UtcNow
                },
                new Reservation
                {
                    DeskId = desks[2].Id,
                    UserId = users[0].Id,
                    StartDate = DateTime.Today.AddDays(-7),
                    EndDate = DateTime.Today.AddDays(-5),
                    CreatedAt = DateTime.UtcNow.AddDays(-7)
                },
                new Reservation
                {
                    DeskId = desks[3].Id,
                    UserId = users[0].Id,
                    StartDate = DateTime.Today.AddDays(-4),
                    EndDate = DateTime.Today.AddDays(-3),
                    CreatedAt = DateTime.UtcNow.AddDays(-4)
                },
                new Reservation
                {
                    DeskId = desks[5].Id,
                    UserId = users[0].Id,
                    StartDate = DateTime.Today.AddDays(-2),
                    EndDate = DateTime.Today.AddDays(4),
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                }
            };

            context.Reservations.AddRange(reservations);

            // --------------------
            // Sync desk status with reservations
            // --------------------
            foreach (var reservation in reservations)
            {
                var desk = desks.First(d => d.Id == reservation.DeskId);

                if (desk.Status != DeskStatus.Maintenance)
                {
                    desk.Status = DeskStatus.Reserved;
                }
            }

            context.SaveChanges();
        }
    }
}
