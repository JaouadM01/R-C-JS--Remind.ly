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
    Title = "Test vandaag",
    Date = DateTime.UtcNow.AddHours(1), // 👈 today
    Description = "Deze herinnering is vandaag",
    Status = ReminderStatus.Upcoming,
    UserId = user.Id
},
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
                },
                new Reminder {
        Title = "Jaarlijkse APK keuring",
        Date = DateTime.UtcNow.AddDays(10),
        Description = "Auto naar garage brengen",
        Status = ReminderStatus.Upcoming,
        UserId = user.Id
    },
    new Reminder {
        Title = "Huwelijksverjaardag",
        Date = DateTime.UtcNow.AddDays(20),
        Description = "Bloemen en diner reserveren",
        Status = ReminderStatus.Upcoming,
        UserId = user.Id
    },
    new Reminder {
        Title = "Factuur betalen",
        Date = DateTime.UtcNow.AddDays(-3),
        Description = "Energiebedrijf factuur",
        Status = ReminderStatus.Forgotten,
        UserId = user.Id
    },
    new Reminder {
        Title = "Boek uitleveren",
        Date = DateTime.UtcNow.AddDays(1),
        Description = "Bibliotheekboek terugbrengen",
        Status = ReminderStatus.Upcoming,
        UserId = user.Id
    },
    new Reminder {
        Title = "Vergadering met HR",
        Date = DateTime.UtcNow.AddDays(5).AddHours(14),
        Description = "Online meeting om 15:00",
        Status = ReminderStatus.Upcoming,
        UserId = user.Id
    },
    new Reminder {
        Title = "Medisch onderzoek",
        Date = DateTime.UtcNow.AddDays(-10),
        Description = "Resultaten ophalen",
        Status = ReminderStatus.Remembered,
        UserId = user.Id
    },
    new Reminder {
        Title = "Weekendje weg boeken",
        Date = DateTime.UtcNow.AddDays(12),
        Description = "Booking.com checken",
        Status = ReminderStatus.Upcoming,
        UserId = user.Id
    },
    new Reminder {
        Title = "Controleer verzekeringspolis",
        Date = DateTime.UtcNow.AddDays(-7),
        Description = "Verlengdatum checken",
        Status = ReminderStatus.Forgotten,
        UserId = user.Id
    }
            };

            context.Reminders.AddRange(reminders);
            context.SaveChanges();
        }
    }
}
