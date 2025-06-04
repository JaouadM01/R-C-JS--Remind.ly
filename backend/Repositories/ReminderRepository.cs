using backend.Database;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IReminderRepository
    {
        Task<IEnumerable<Reminder>> GetUpcomingByUserAsync(Guid userId);
        Task<Reminder?> GetByIdAsync(Guid id);
        Task AddAsync(Reminder reminder);
        Task DeleteAsync(Guid reminderId);
        Task<List<Reminder>> GetAll();
        Task UpdateAsync(Reminder reminder);
    }
    public class ReminderRepository : IReminderRepository
    {
        private readonly AppDbContext _context;
        public ReminderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reminder>> GetUpcomingByUserAsync(Guid userId)
        {
            try
            {
                return await _context.Reminders
                    .Where(r => r.UserId == userId && r.Date >= DateTime.UtcNow)
                    .OrderBy(r => r.Date)
                    .ToListAsync();
            }
            catch
            {
                // Log exception as needed
                return Enumerable.Empty<Reminder>();
            }
        }

        public async Task<Reminder?> GetByIdAsync(Guid id)
        {
            try
            {
                return await _context.Reminders.FindAsync(id);
            }
            catch
            {
                // Log exception as needed
                return null;
            }
        }
        public async Task<List<Reminder>> GetAll()
        {
            try
            {
                return await _context.Reminders.ToListAsync();
            }
            catch
            {
                // Log exception as needed
                return null;
            }
        }

        public async Task AddAsync(Reminder reminder)
        {
            try
            {
                await _context.Reminders.AddAsync(reminder);
                await _context.SaveChangesAsync();
            }
            catch
            {
                // Log exception as needed
                throw;
            }
        }

        public async Task DeleteAsync(Guid reminderId)
        {
            try
            {
                var reminder = await _context.Reminders.FindAsync(reminderId);
                if (reminder == null) throw new InvalidOperationException("Reminder not found.");
                _context.Reminders.Remove(reminder);
                await _context.SaveChangesAsync();
            }
            catch
            {
                // Log exception as needed
                throw;
            }
        }

        public async Task UpdateAsync(Reminder reminder)
        {
            _context.Reminders.Update(reminder);
            await _context.SaveChangesAsync();
        }

    }
}
