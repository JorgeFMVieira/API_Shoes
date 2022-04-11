using JorgeShoes.DTO;
using JorgeShoes.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;

namespace JorgeShoes.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRoles> _roleManager;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _config;

        private readonly List<String> INTERNAL_ROLES = new()
        {
            Roles.Admin.Value
        };

        public UserService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRoles> roleManager, IEmailService emailService, IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _config = config;
        }

        public async Task<MessagingHelper> ResetPassword(ResetPasswordDTO reset)
        {
            MessagingHelper result = new();

            try
            {
                var user = await _userManager.FindByIdAsync(reset.UserId);

                if (user == null)
                {
                    result.Success = false;
                    result.Message = "We weren´t able the find a user.";
                    return result;
                }

                var resetPassword = await _userManager.ResetPasswordAsync(user, reset.Token, reset.Password);

                if (!resetPassword.Succeeded)
                {
                    string errors = string.Empty;
                    foreach (var error in resetPassword.Errors)
                    {
                        errors += error.Description + "\r";
                    }

                    result.Success = false;
                    result.Message = "Something went wrong. "+ errors;
                    return result;
                }
                result.Success = true;
                result.Message = "The password was changed sucessfully";
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "We couldn´t reset the password: " + ex;

            }
            return result;
        }

        public async Task<MessagingHelper> SendEmailForgotPassword(ForgotPasswordDTO dto)
        {
            MessagingHelper result = new MessagingHelper();

            try
            {
                var user = await _userManager.FindByEmailAsync(dto.Email);

                if (user == null)
                {
                    result.Success = false;
                    result.Message = "We weren´t able to find a user with that email.";
                    return result;
                }
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                string frontendUrl = _config["FrontendUrl"];
                token = HttpUtility.UrlEncode(token);
                string link = $"{frontendUrl}/ResetPassword?userId={user.Id}&token={token}";

                RecoveryPasswordDTO obj = new()
                {
                    Link = link
                };

                MessagingHelper resultSendEmail = await _emailService.SendEmail(dto.Email, "RecoverPassword", obj, "Products");

                if (resultSendEmail.Success == false)
                {
                    result.Success = false;
                    result.Message = "We couldn´t send the email.";
                }
                result.Success = true;
                result.Message = "Email sent sucessfully.";



            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "We couldn´t send the email: " + ex;
                return result;
            }

            return result;
        }
    }
}
