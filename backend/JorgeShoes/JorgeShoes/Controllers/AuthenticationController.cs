using JorgeShoes.DTO;
using JorgeShoes.Models;
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
        private readonly IAuthenticationService _authenticationService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthenticationController(UserManager<ApplicationUser> userManager, IAuthenticationService authService)
        {
            _authenticationService = authService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUser()
        {
            MessagingHelper<AuthenticationDTO> response = new();

            try
            {
                response.success = true;
                response.message = "";
                response.obj = new AuthenticationDTO()
                {
                    Token = HttpContext.Session.GetString("token") ?? null,
                    Username = HttpContext.Session.GetString("username") ?? null,
                    Id = HttpContext.Session.GetString("id") ?? null,
                    Roles = HttpContext.Session.GetString("roles")?.Split(",") ?? null,
                };
            }
            catch (Exception ex)
            {
                response.success = false;
                response.message = ex.Message;
                response.obj = null;
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
                    result.message = responseValidatorDTO.Errors.FirstOrDefault()!.ErrorMessage;
                    return Ok(result);
                }

                var passwordValidator = new PasswordValidator<ApplicationUser>();
                var resultValidatePassword = await passwordValidator.ValidateAsync(_userManager, null!, authDTO.Password);
                if (!resultValidatePassword.Succeeded)
                {
                    result.success = false;
                    result.message = "Password is not following the requirements.";
                    return Ok(result);
                }


                ApplicationUser userInDatabase = await _userManager.FindByEmailAsync(authDTO.Email);
                if (userInDatabase == null)
                {
                    userInDatabase = new ApplicationUser
                    {
                        Email = authDTO.Email,
                        EmailConfirmed = true,
                        Name = authDTO.Username!,
                        UserName = authDTO.Email,
                    };
                    var resultCreateUserInDatabase = await _userManager.CreateAsync(userInDatabase, authDTO.Password);

                    await _userManager.AddToRoleAsync(userInDatabase, Roles.roles.Value);
                    if (resultCreateUserInDatabase.Succeeded)
                    {
                        result.success = true;
                        result.message = "The user was created sucessfully.";
                    }
                    else
                    {
                        result.success = false;
                        result.message = "We weren´t able to create the user.";
                    }
                }

                else
                {
                    result.success = false;
                    result.message = "Already exists an user with that email";
                }
            }
            catch (Exception ex)
            {
                result.success = false;
                result.message = "We weren´t able to create the user.";
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
            MessagingHelper<object> response = new();

            try
            {
                HttpContext.Session.Clear();
                response.success = true;
                response.message = "You have logged out!";

            }
            catch (Exception ex)
            {
                response.success = false;
                response.obj = null;
                response.message = ex.Message;
            }
            return Ok(response);
        }

    }
}
