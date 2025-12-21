using AutoMapper;
using DeskBooking.Application.DTOs;
using DeskBooking.Core.Entities;

namespace DeskBooking.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            
            CreateMap<User, UserProfileDto>()
                .ForMember(dest => dest.CurrentReservations, opt => opt.Ignore())
                .ForMember(dest => dest.PastReservations, opt => opt.Ignore());

            CreateMap<Desk, DeskDto>()
                .ForMember(dest => dest.ReservationId, opt => opt.Ignore())
                .ForMember(dest => dest.ReservedByFirstName, opt => opt.Ignore())
                .ForMember(dest => dest.ReservedByLastName, opt => opt.Ignore())
                .ForMember(dest => dest.ReservationStartDate, opt => opt.Ignore())
                .ForMember(dest => dest.ReservationEndDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsReservedByCurrentUser, opt => opt.Ignore())
                .ForMember(dest => dest.IsAvailableForReservation, opt => opt.Ignore());

            CreateMap<Reservation, ReservationDto>()
                .ForMember(dest => dest.DeskNumber, opt => opt.MapFrom(src => src.Desk.DeskNumber))
                .ForMember(dest => dest.UserFirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.UserLastName, opt => opt.MapFrom(src => src.User.LastName));
        }
    }
}