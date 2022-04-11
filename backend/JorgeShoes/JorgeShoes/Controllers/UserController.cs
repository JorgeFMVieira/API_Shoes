using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JorgeShoes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<MessagingHelper> ForgotPassword(ForgotPasswordDTO dto)
        {
            return await _userService.SendEmailForgotPassword(dto);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<MessagingHelper> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
        {
            return await _userService.ResetPassword(resetPasswordDTO);
        }
    }
}
