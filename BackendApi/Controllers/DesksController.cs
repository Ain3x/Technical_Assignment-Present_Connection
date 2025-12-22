using AutoMapper;
using DeskBooking.Application.DTOs;
using DeskBooking.Core.Enums;
using DeskBooking.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesksController : ControllerBase
    {
        private readonly IDeskRepository _deskRepository;
        private readonly IMapper _mapper;

        public DesksController(IDeskRepository deskRepository, IMapper mapper)
        {
            _deskRepository = deskRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeskDto>>> GetDesks(
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] int? currentUserId)
        {
            if (!startDate.HasValue || !endDate.HasValue)
            {
                return BadRequest("Start date and end date are required.");
            }

        
            var queryStartDate = startDate ?? DateTime.Today;
            var queryEndDate = endDate ?? DateTime.Today;

            var desks = await _deskRepository.GetAllAsync();
            desks = desks.OrderBy(d => d.DeskNumber);
            var deskDtos = new List<DeskDto>();

            foreach (var desk in desks)
            {
                var deskDto = _mapper.Map<DeskDto>(desk);
                deskDto.Status = desk.Status;
                deskDto.MaintenanceMessage = desk.MaintenanceMessage;

                var activeReservation = desk.Reservations
                    .Where(r => r.StartDate <= queryEndDate 
                        && r.EndDate >= queryStartDate)
                    .OrderBy(r => r.StartDate)
                    .FirstOrDefault();

                if (activeReservation != null)
                {
                    deskDto.ReservedByFirstName = activeReservation.User.FirstName;
                    deskDto.ReservedByLastName = activeReservation.User.LastName;
                    deskDto.ReservedByFullName = $"{activeReservation.User.FirstName} {activeReservation.User.LastName}";
                    deskDto.ReservationStartDate = activeReservation.StartDate;
                    deskDto.ReservationEndDate = activeReservation.EndDate;
                    deskDto.ReservationId = activeReservation.Id;
                    
                    if (currentUserId.HasValue && activeReservation.UserId == currentUserId.Value)
                    {
                        deskDto.IsReservedByCurrentUser = true;
                    }
                    
                    deskDto.Status = DeskStatus.Reserved;
                }
                else if (desk.Status == DeskStatus.Maintenance)
                {
                    deskDto.IsAvailableForReservation = false;
                }
                else
                {
                    deskDto.Status = DeskStatus.Open;
                    deskDto.IsAvailableForReservation = true;
                }

                deskDtos.Add(deskDto);
            }

            return Ok(deskDtos);
        }

    }
}