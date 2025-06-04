using Microsoft.AspNetCore.Mvc;
using backend.models.DTOs;
using backend.models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _userService.GetAll();
                if (users == null) return NotFound();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving userlist");
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            try
            {
                var user = await _userService.RegisterAsync(dto);
                if (user == null) return BadRequest("User already exists");

                return Ok(new
                {
                    user.Id,
                    user.Email,
                    user.Name
                });
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                return StatusCode(500, "An error occurred while registering the user.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            try
            {
                var user = await _userService.LoginAsync(dto);
                if (user == null) return Unauthorized("Invalid credentials");

                // JWT auth komt hier later bij, nu gewoon dummy token
                return Ok(new
                {
                    user.Id,
                    user.Email,
                    user.Name,
                    token = "dummy-token"
                });
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                return StatusCode(500, "An error occurred while logging in.");
            }
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            try
            {
                var user = await _userService.GetUserById(userId);
                if (user == null) return NotFound("Invalid credentials");
                return Ok(user);
            }
            catch (Exception)
            {
                // Log exception (optional)
                return StatusCode(500, "An error occurred while logging in.");
            }
        }
    }
}
