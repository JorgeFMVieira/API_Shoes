using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IAuthenticationServices
    {
        Task<MessagingHelper<AuthenticationDTO>> Login(LoginDTO login);
    }
}
