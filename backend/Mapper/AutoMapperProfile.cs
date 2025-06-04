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
            CreateMap<Reminder, ReminderDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
