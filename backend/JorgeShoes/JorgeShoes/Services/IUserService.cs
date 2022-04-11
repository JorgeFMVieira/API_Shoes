using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IUserService
    {
        Task<MessagingHelper> SendEmailForgotPassword(ForgotPasswordDTO dto);

        Task<MessagingHelper> ResetPassword(ResetPasswordDTO reser);
    }
}
