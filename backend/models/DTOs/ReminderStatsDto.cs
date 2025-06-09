namespace backend.models.DTOs
{
    public class ReminderStatsDto
    {
        public int Total { get; set; }
        public int Remembered { get; set; }
        public int Forgotten { get; set; }
    }
}