using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IAuthenticationService
    {
        Task<MessagingHelper<AuthenticationDTO>> Login(LoginDTO login);
    }
}
