using AutoMapper;
using backend.models;
using backend.models.DTOs;

namespace backend.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, RegisterDto>().ReverseMap();
            CreateMap<Reminder, ReminderDto>().ReverseMap()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
