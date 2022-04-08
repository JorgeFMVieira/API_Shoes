using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace JorgeShoes.Controllers
{
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationServices _authenticationService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthenticationController(UserManager<ApplicationUser> userManager, IAuthenticationServices authenticationService)
        {
            _authenticationService = authenticationService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUser()
        {
            MessagingHelper<AuthenticationDTO> response = new MessagingHelper<AuthenticationDTO>();

            try
            {
                response.Success = true;
                response.Message = "";
                response.Obj = new AuthenticationDTO()
                {
                    Token = HttpContext.Session.GetString("token") ?? null,
                    Username = HttpContext.Session.GetString("username") ?? null,
                    Id = HttpContext.Session.GetString("id") ?? null,
                    Roles = HttpContext.Session.GetString("roles")?.Split(",") ?? null,
                };
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                response.Obj = null;
            }

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(CreateUserDTO authDTO)
        {
            MessagingHelper result = new();

            try
            {
                CreateUserValidation validator = new CreateUserValidation();
                var responseValidatorDTO = await validator.ValidateAsync(authDTO);
                if (responseValidatorDTO.IsValid == false)
                {
                    result.Message = responseValidatorDTO.Errors.FirstOrDefault()!.ErrorMessage;
                    return Ok(result);
                }

                var passwordValidator = new PasswordValidator<ApplicationUser>();
                var resultValidatePassword = await passwordValidator.ValidateAsync(_userManager, null!, authDTO.Password);
                if (!resultValidatePassword.Succeeded)
                {
                    result.Success = false;
                    result.Message = "Password is not following the requirements.";
                    return Ok(result);
                }


                ApplicationUser userInDatabase = await _userManager.FindByEmailAsync(authDTO.Email);
                if (userInDatabase == null)
                {
                    userInDatabase = new ApplicationUser
                    {
                        Email = authDTO.Email,
                        EmailConfirmed = true,
                        UserName = authDTO.Email,
                        Name = authDTO.Username!,
                    };
                    var resultCreateUserInDatabase = await _userManager.CreateAsync(userInDatabase, authDTO.Password);

                    await _userManager.AddToRoleAsync(userInDatabase, Roles.Client.Value);
                    if (resultCreateUserInDatabase.Succeeded)
                    {
                        result.Success = true;
                        result.Message = "The user was created sucessfully.";
                    }
                    else
                    {
                        result.Success = false;
                        result.Message = "We weren´t able to create the user.";
                    }
                }

                else
                {
                    result.Success = false;
                    result.Message = "Already exists an user with that email";
                }
            }
            catch (Exception)
            {
                result.Success = false;
                result.Message = "We weren´t able to create the user.";
            }
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<MessagingHelper<AuthenticationDTO>> Login([FromBody] LoginDTO login)
        {
            return await _authenticationService.Login(login);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult Logout()
        {
            MessagingHelper<object> response = new MessagingHelper<object>();

            try
            {
                HttpContext.Session.Clear();
                response.Success = true;
                response.Message = "You have logged out!";

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Obj = null;
                response.Message = ex.Message;
            }
            return Ok(response);
        }

    }
}
