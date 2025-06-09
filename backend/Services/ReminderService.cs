using backend.models.DTOs;
using backend.models;
using backend.Repositories;
using AutoMapper;

namespace backend.Services
{
    public class ReminderService
    {
        private readonly IReminderRepository _reminderRepo;
        private readonly IMapper _mapper;

        public ReminderService(IReminderRepository reminderRepo, IMapper mapper)
        {
            _reminderRepo = reminderRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReminderDto>> GetUpcomingAsync(Guid userId)
        {
            var reminders = await _reminderRepo.GetUpcomingByUserAsync(userId);
            return _mapper.Map<List<ReminderDto>>(reminders);
        }
        public async Task<IEnumerable<ReminderDto>> GetMonth(Guid userId)
        {
            var reminders = await _reminderRepo.GetUpcomingByUserAsync(userId);
            var now = DateTime.UtcNow;
            var currentMonthReminders = reminders
                .Where(r => r.Date.Year == now.Year && r.Date.Month == now.Month)
                .OrderBy(r => r.Date);

            return _mapper.Map<List<ReminderDto>>(currentMonthReminders);
        }

        public async Task<Reminder> CreateAsync(RegisterReminderDto dto, Guid userId)
        {
            var reminder = new Reminder
            {
                Title = dto.Title,
                Date = dto.Date,
                Description = dto.Description,
                UserId = userId
            };

            await _reminderRepo.AddAsync(reminder);
            return reminder;
        }

        public async Task<ReminderStatsDto> GetStatsAsync(Guid userId)
        {
            var reminders = await _reminderRepo.GetUpcomingByUserAsync(userId);

            var stats = new ReminderStatsDto
            {
                Total = reminders.Count(),
                Remembered = reminders.Count(r => r.Status == ReminderStatus.Remembered),
                Forgotten = reminders.Count(r => r.Status == ReminderStatus.Forgotten)
            };

            return stats;
        }


        public async Task DeleteAsync(Guid reminderId)
        {
            await _reminderRepo.DeleteAsync(reminderId);
        }
        public async Task<List<ReminderDto>> GetAll()
        {
            var reminders = await _reminderRepo.GetAll();
            var remindersdto = _mapper.Map<List<ReminderDto>>(reminders);
            return remindersdto;
        }

        public async Task<bool> UpdateStatusAsync(Guid reminderId, string newStatus)
        {
            var reminder = await _reminderRepo.GetByIdAsync(reminderId);
            if (reminder == null) return false;

            if (!Enum.TryParse<ReminderStatus>(newStatus, true, out var parsedStatus)) return false;

            reminder.Status = parsedStatus;
            await _reminderRepo.UpdateAsync(reminder);
            return true;
        }
    }
}
