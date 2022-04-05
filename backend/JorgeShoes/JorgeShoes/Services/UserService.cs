using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateUser(CreateUserDTO user)
        {
            try
            {
                _context.User.Add(user.ToEntity());
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
