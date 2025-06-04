using System;

namespace backend.models
{
    public class Reminder
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? Description { get; set; }

        public ReminderStatus Status { get; set; } = ReminderStatus.Upcoming;

        public Guid UserId { get; set; }
        public User User { get; set; }
    }

    public enum ReminderStatus
    {
        Upcoming,
        Remembered,
        Forgotten
    }
}
