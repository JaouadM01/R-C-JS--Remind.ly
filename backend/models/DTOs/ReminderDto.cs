using System;

namespace backend.models.DTOs
{
    public class ReminderDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
    }
}
