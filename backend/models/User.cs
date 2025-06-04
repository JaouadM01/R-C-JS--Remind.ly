using System.Collections.Generic;

namespace backend.models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }

        public ICollection<Reminder>? Reminders { get; set; }
    }
}
