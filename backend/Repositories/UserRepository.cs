using backend.models;
using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(Guid id);
        Task AddAsync(User user);
        Task<List<User>> GetAllAsync();
    }
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            try
            {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            }
            catch (Exception ex)
            {
            // Log exception or handle as needed
            throw;
            }
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            try
            {
            return await _context.Users.FindAsync(id);
            }
            catch (Exception ex)
            {
            // Log exception or handle as needed
            throw;
            }
        }

        public async Task AddAsync(User user)
        {
            try
            {
                _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception or handle as needed
                throw;
            }
        }
        public async Task<List<User>> GetAllAsync()
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                // Log exception or handle as needed
                throw;
            }
        }
        }
    }