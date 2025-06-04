using Microsoft.EntityFrameworkCore;
using backend.models;

namespace backend.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
    }
}
