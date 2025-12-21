using AutoMapper;
using DeskBooking.Application.DTOs;
using DeskBooking.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;

        public UsersController(
            IUserRepository userRepository,
            IReservationRepository reservationRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}/profile")]
        public async Task<ActionResult<UserProfileDto>> GetUserProfile(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            
            if (user == null)
                return NotFound(new { message = $"User with ID {id} not found" });

            var allReservations = await _reservationRepository.GetByUserIdAsync(id);
            var today = DateTime.Today;
            
            // Current reservations: not yet ended
            var currentReservations = allReservations
                .Where(r => r.EndDate >= today)
                .OrderBy(r => r.StartDate)
                .ToList();
            
            // Past reservations: already ended
            var pastReservations = allReservations
                .Where(r => r.EndDate < today)
                .OrderByDescending(r => r.EndDate)
                .ToList();

            var profileDto = new UserProfileDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CurrentReservations = _mapper.Map<List<ReservationDto>>(currentReservations),
                PastReservations = _mapper.Map<List<ReservationDto>>(pastReservations)
            };

            return Ok(profileDto);
        }
    }
}