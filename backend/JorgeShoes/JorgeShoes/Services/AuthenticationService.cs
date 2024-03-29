﻿using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public class AuthenticationService : IAuthenticationServices
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        private readonly IPasswordHasher<ApplicationUser> _passwordHasher;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticationService(UserManager<ApplicationUser> userManager, IConfiguration config,
            IPasswordHasher<ApplicationUser> passwordHasher, IHttpContextAccessor httpContextAccessor, AppDbContext context)
        {
            _userManager = userManager;
            _config = config;
            _passwordHasher = passwordHasher;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        public async Task<MessagingHelper<AuthenticationDTO>> Login(LoginDTO login)
        {
            MessagingHelper<AuthenticationDTO> response = new();
            try
            {
                var user = await AuthenticateUser(login);

                    var userRoles = (await _userManager.GetRolesAsync(user)).ToList();

                if (user != null)
                {
                    var tokenString = await GenerateJSONWebToken(user, userRoles);

                    AuthenticationDTO responseObj = new()
                    {
                        Id = user.Id,
                        Token = tokenString,
                        Username = user.Name,
                        Roles = userRoles.ToArray(),

                    };

                    SaveToken(responseObj);
                    response.Success = true;
                    response.Obj = responseObj;
                }
                else
                {
                    response.Success = false;
                    response.Message = "Something is wrong with your information.";
                }
            }
            catch (Exception)
            {
                response.Success = false;
                response.Message = "We werent´t able to find that account.";
            }
            return response;
        }

        private async Task<ApplicationUser> AuthenticateUser(LoginDTO login)
        {
            ApplicationUser user = null;
            try
            {
                //Se o utilizador existe
                var userfound = await _userManager.FindByEmailAsync(login.Email);

                //se existir
                if (userfound != null)
                {
                    if (_passwordHasher.VerifyHashedPassword(userfound, userfound.PasswordHash, login.Password) == PasswordVerificationResult.Success)
                    {
                        user = userfound;

                        user.AccessFailedCount = 0;
                        user.LockoutEnd = null;

                        await _userManager.UpdateAsync(user);
                    }
                    else
                    {
                        await UserAccessFailed(userfound);
                    }
                }
                return user;
            }
            catch (Exception)
            {
                return user;
            }
        }

        private async Task UserAccessFailed(ApplicationUser user)
        {
            user.AccessFailedCount++;
            await _userManager.UpdateAsync(user);
        }

        private async Task<string> GenerateJSONWebToken(ApplicationUser userInfo, List<string> userRoles)
        {
            var user = await _userManager.FindByIdAsync(userInfo.Id);

            var userClaims = await _userManager.GetClaimsAsync(user);
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = GetTokenClaims(user).Union(userClaims).ToList();

            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"], claims: claims, signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static IEnumerable<Claim> GetTokenClaims(IdentityUser user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };
        }

        public virtual MessagingHelper<bool> SaveToken(AuthenticationDTO user)
        {
            MessagingHelper<bool> response = new();

            try
            {
                _httpContextAccessor.HttpContext.Session.SetString("token", user.Token);
                _httpContextAccessor.HttpContext.Session.SetString("username", user.Username);
                _httpContextAccessor.HttpContext.Session.SetString("id", user.Id);
                _httpContextAccessor.HttpContext.Session.SetString("roles", String.Join(",", user.Roles));

                response.Success = true;
                response.Obj = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Obj = false;
                response.Message = ex.Message;

            }

            return response;
        }
    }
}
