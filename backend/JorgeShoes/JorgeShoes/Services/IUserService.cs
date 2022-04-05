using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Response;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IUserService
    {
        Task<UserResponse> GetAll(int page, float entries, string search, string searchBy, string order);
        Task<UserModel> GetById(int id);
        Task<UserResponse> CreateUser(UserModel user);
    }
}
