using backend.models.DTOs;
using backend.models;
using backend.Repositories;
using AutoMapper;

namespace backend.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<User?> RegisterAsync(RegisterDto dto)
        {
            var existing = await _userRepo.GetByEmailAsync(dto.Email);
            if (existing != null) return null;

            var user = new User
            {
                Email = dto.Email,
                Name = dto.Name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _userRepo.AddAsync(user);
            return user;
        }

        public async Task<User?> LoginAsync(LoginDto dto)
        {
            var user = await _userRepo.GetByEmailAsync(dto.Email);
            if (user == null) return null;

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)) return null;

            return user;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var users = await _userRepo.GetAllAsync();
            if (users == null) return null;
            var usersDto = _mapper.Map<List<UserDto>>(users);
            return usersDto;
        }
        public async Task<UserDto> GetUserById(Guid userId)
        {
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null) return null;
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }
    }
}
