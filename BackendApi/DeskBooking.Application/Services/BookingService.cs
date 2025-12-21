using DeskBooking.Core.Entities;
using DeskBooking.Core.Repositories;
using DeskBooking.Core.Services;
using DeskBooking.Core.Enums;

namespace DeskBooking.Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IDeskRepository _deskRepository;
        private readonly IReservationRepository _reservationRepository;

        public BookingService(IDeskRepository deskRepository, IReservationRepository reservationRepository)
        {
            _deskRepository = deskRepository;
            _reservationRepository = reservationRepository;
        }

        public async Task<bool> IsDeskAvailableAsync(int deskId, DateTime startDate, DateTime endDate)
        {
            var desk = await _deskRepository.GetByIdAsync(deskId);
            if (desk == null) 
                return false;
            
            if (desk.Status == DeskStatus.Maintenance)
                return false;
            
            var overlapping = await _reservationRepository
                .GetOverlappingReservationsAsync(deskId, startDate, endDate);
            
            return !overlapping.Any();
        }

        public async Task<Reservation> CreateReservationAsync(
            int deskId, 
            int userId, 
            DateTime startDate, 
            DateTime endDate)
        {
            if (endDate < startDate)
                throw new ArgumentException("End date must be after or equal to start date");
            
            if (startDate.Date < DateTime.Today)
                throw new ArgumentException("Cannot create reservations in the past");
            
            if (!await IsDeskAvailableAsync(deskId, startDate, endDate))
                throw new InvalidOperationException("Desk is not available for the selected dates");
            
            var reservation = new Reservation
            {
                DeskId = deskId,
                UserId = userId,
                StartDate = startDate.Date,
                EndDate = endDate.Date,

                CreatedAt = DateTime.UtcNow
            };
            
            return await _reservationRepository.AddAsync(reservation);
            
        }

        public async Task<bool> CancelReservationForTodayAsync(int reservationId, int userId)
        {
            var reservation = await _reservationRepository.GetByIdAsync(reservationId);
            
            if (reservation == null || reservation.UserId != userId)
                return false;
            
            var today = DateTime.Today;
            
            if (today < reservation.StartDate || today > reservation.EndDate)
                throw new InvalidOperationException("Today is not within the reservation date range");
            
            if (reservation.StartDate == reservation.EndDate)
            {
                await _reservationRepository.UpdateAsync(reservation);
                return true;
            }
            
            if (today == reservation.StartDate)
            {
                reservation.StartDate = reservation.StartDate.AddDays(1);
                await _reservationRepository.UpdateAsync(reservation);
            }
            else if (today == reservation.EndDate)
            {
                reservation.EndDate = reservation.EndDate.AddDays(-1);
                await _reservationRepository.UpdateAsync(reservation);
            }
            else
            {
                var originalEndDate = reservation.EndDate;
                
                reservation.EndDate = today.AddDays(-1);
                await _reservationRepository.UpdateAsync(reservation);
                
                var newReservation = new Reservation
                {
                    DeskId = reservation.DeskId,
                    UserId = reservation.UserId,
                    StartDate = today.AddDays(1),
                    EndDate = originalEndDate,
                    CreatedAt = DateTime.UtcNow
                };
                
                await _reservationRepository.UpdateAsync(newReservation);
            }
            
            return true;
        }

        public async Task<bool> CancelEntireReservationAsync(int reservationId, int userId)
        {
            var reservation = await _reservationRepository.GetByIdAsync(reservationId);
            
            if (reservation == null || reservation.UserId != userId)
                return false;
            
            await _reservationRepository.RemoveAsync(reservation);
            
            return true;
        }
    }
}