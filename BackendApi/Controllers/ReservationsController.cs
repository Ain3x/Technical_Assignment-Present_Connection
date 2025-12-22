using AutoMapper;
using DeskBooking.Application.DTOs;
using DeskBooking.Core.Repositories;
using DeskBooking.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IBookingService _bookingService;
        private readonly IMapper _mapper;

        public ReservationsController(
            IReservationRepository reservationRepository,
            IBookingService bookingService,
            IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _bookingService = bookingService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDto>> GetReservation(int id)
        {
            var reservation = await _reservationRepository.GetByIdAsync(id);
            
            if (reservation == null)
                return NotFound(new { message = $"Reservation with ID {id} not found" });

            var reservationDto = _mapper.Map<ReservationDto>(reservation);
            return Ok(reservationDto);
        }

        [HttpPost]
        public async Task<ActionResult<ReservationDto>> CreateReservation(
            [FromBody] CreateReservationRequest request)
        {
            try
            {
                var reservation = await _bookingService.CreateReservationAsync(
                    request.DeskId,
                    request.UserId,
                    request.StartDate,
                    request.EndDate);

                var reservationDto = _mapper.Map<ReservationDto>(reservation);
                
                return CreatedAtAction(
                    nameof(GetReservation),
                    new { id = reservation.Id },
                    reservationDto);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}/today")]
        public async Task<ActionResult> CancelReservationForToday(
            int id,
            [FromQuery] int userId)
        {
            try
            {
                var success = await _bookingService.CancelReservationForTodayAsync(id, userId);
                
                if (!success)
                {
                    return NotFound(new { message = "Reservation not found or you don't have permission to cancel it" });
                }

                return Ok(new { message = "Reservation cancelled for today" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> CancelEntireReservation(
            int id,
            [FromQuery] int userId)
        {
            var success = await _bookingService.CancelEntireReservationAsync(id, userId);
            
            if (!success)
            {
                return NotFound(new { message = "Reservation not found or you don't have permission to cancel it" });
            }

            return Ok(new { message = "Entire reservation cancelled successfully" });
        }

        
    }
}