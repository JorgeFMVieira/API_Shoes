using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IUserService
    {
        Task<UserModel> GetAll(int page, float entries, string search, string searchBy, string order);
        Task<UserModel> GetById(int id);
        Task CreateUser(CreateUserDTO user);
    }
}
