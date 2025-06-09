using Microsoft.AspNetCore.Mvc;
using backend.models.DTOs;
using backend.models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReminderController(ReminderService reminderService) : ControllerBase
    {
        private readonly ReminderService _reminderService = reminderService;

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcoming(Guid userId)
        {
            try
            {
                var reminders = await _reminderService.GetUpcomingAsync(userId);
                return Ok(reminders);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while retrieving upcoming reminders");
            }
        }
        [HttpGet("thismonth")]
        public async Task<IActionResult> GetMonth(Guid userId)
        {
            try
            {
                var reminders = await _reminderService.GetMonth(userId);
                return Ok(reminders);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while retrieving upcoming reminders");
            }
        }
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats([FromQuery] Guid userId)
        {
            try
            {
                var stats = await _reminderService.GetStatsAsync(userId);
                return Ok(stats);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while fetching reminder stats");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterReminderDto dto, Guid userId)
        {
            try
            {
                var reminder = await _reminderService.CreateAsync(dto, userId);
                return Ok(reminder);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while creating the reminder");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Remove(Guid reminderId)
        {
            try
            {
                await _reminderService.DeleteAsync(reminderId);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while trying to remove reminder");
            }
        }
        [HttpGet("All")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var reminders = await _reminderService.GetAll();
                return Ok(reminders);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while trying to remove reminder");
            }
        }

        [HttpPut("status")]
        public async Task<IActionResult> UpdateStatus([FromQuery] Guid reminderId, [FromQuery] string newStatus)
        {
            try
            {
                var success = await _reminderService.UpdateStatusAsync(reminderId, newStatus);
                if (!success) return BadRequest("Invalid reminder or status");

                return Ok("Reminder status updated");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating reminder status");
            }
        }
    }
}
