using System;

namespace backend.models.DTOs
{
    public class ReminderDto
    {
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string? Description { get; set; }
    }
}
