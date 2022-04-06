using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace JorgeShoes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        public LoginController(IConfiguration config, AppDbContext context)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<LoginResponse> Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            var users = new LoginResponse();

            if (user != null)
            {
                var token = Generate(user);
                users.Token = token;
                users.User = _context.User.Where(x => x.Email == userLogin.Email).ToList();
                return users;
            }


            users.Error = true;
            users.ErrorMsg = "User not found";
            return users;
        }

        private string Generate(UserModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel Authenticate(UserLogin userLogin)
        {
            var currentUser = _context.User.FirstOrDefault(x => x.Email.ToLower() == userLogin.Email.ToLower() && x.Password == userLogin.Password);

            if(currentUser != null)
            {
                return currentUser;
            }

            return null;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUser()
        {
            LoginResponse<ListUserDTO> response = new LoginResponse<ListUserDTO>();

            try
            {
                response.success = true;
                response.message = "";
                response.obj = new ListUserDTO();
                {
                    Token = HttpContext.Session.GetString("token") ?? null,
                    UserName = HttpContext.Session.GetString("username") ?? null,
                    Id = HttpContext.Session.GetString("id") ?? null,
                    Role = HttpContext.Session.GetString("roles")?.Split(",") ?? null,
                };
            }
            catch (Exception ex)
            {
                response.Error = true;
                response.ErrorMsg = ex.Message;
                response.obj = null;
            }

            return Ok(response);
        }
    }
}
