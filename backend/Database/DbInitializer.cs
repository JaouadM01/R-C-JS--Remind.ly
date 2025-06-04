using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            // Zorg dat de database bestaat en migraties zijn toegepast
            context.Database.Migrate();

            // Voeg alleen toe als er nog geen gebruikers zijn
            if (context.Users.Any()) return;

            // Dummy user
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                Name = "Test Gebruiker",
                ProfileImageUrl = null
            };

            context.Users.Add(user);
            context.SaveChanges();

            // Voeg reminders toe voor deze user
            var reminders = new List<Reminder>
            {
                new Reminder {
                    Title = "Verjaardag van Anna",
                    Date = DateTime.UtcNow.AddDays(3),
                    Description = "Koop een cadeau!",
                    Status = ReminderStatus.Upcoming,
                    UserId = user.Id
                },
                new Reminder {
                    Title = "Tandartsafspraak",
                    Date = DateTime.UtcNow.AddDays(7),
                    Description = "Bij Tandzorg Middenlaan",
                    Status = ReminderStatus.Upcoming,
                    UserId = user.Id
                },
                new Reminder {
                    Title = "Bel terug",
                    Date = DateTime.UtcNow.AddDays(-1),
                    Description = "Opa bellen",
                    Status = ReminderStatus.Forgotten,
                    UserId = user.Id
                },
                new Reminder {
                    Title = "Bel terug",
                    Date = DateTime.UtcNow.AddDays(-2),
                    Description = "Oma bellen",
                    Status = ReminderStatus.Remembered,
                    UserId = user.Id
                }
            };

            context.Reminders.AddRange(reminders);
            context.SaveChanges();
        }
    }
}
