using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        public UserService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<UserResponse> GetAll(int page, float entries, string search, string searchBy, string order)
        {
            try
            {
                var mostrar = new UserResponse();

                IQueryable<UserModel> products = _context.User.Where(x => x.DateDeleted == null);

                if (search != null)
                {
                    switch (searchBy)
                    {
                        case "Id":
                            products = products.Where(n => (n.DateDeleted == null && n.Id.ToString().Contains(search)));
                            break;
                        default:
                            products = products.Where(n => (n.DateDeleted == null && n.Email.Contains(search)));
                            break;
                    }
                }

                products = order switch
                {
                    "Id" => products.OrderBy(c => c.Id),
                    "Id_desc" => products.OrderByDescending(c => c.Id),
                    "Email" => products.OrderBy(c => c.Email),
                    "Email_desc" => products.OrderByDescending(c => c.Email),

                    _ => products.OrderBy(c => c.Id),
                };

                products = products
                       .Skip((page - 1) * (int)entries)
                       .Take((int)entries);

                mostrar.User = await products.Select(t => new ListUserDTO(t)).ToListAsync();
                mostrar.CurrentPage = page;
                mostrar.Order = order;
                mostrar.Pages = (int)Math.Ceiling(_context.User.Where(x => x.DateDeleted == null).Count() / entries);
                mostrar.Entries = entries;
                mostrar.SearchBy = searchBy;
                mostrar.Search = search;
                return mostrar;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserModel> GetById(int id)
        {
            try
            {
                var user = await _context.User.FindAsync(id);
                return user;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserResponse> CreateUser(UserModel user)
        {
            try
            {
                UserResponse userResponse = new();
                var checkExists = _context.User.Where(x => x.Email == user.Email && x.DateDeleted == null);
                if (checkExists.Any())
                {
                    userResponse.Error = true;
                    userResponse.ErrorMsg = "Already exists an user with that email";
                    return userResponse;
                }
                else
                {
                    user.DateCreated = DateTime.Now;
                    _context.User.Add(user);
                    await _context.SaveChangesAsync();
                }
                return userResponse;
            }
            catch
            {
                throw;
            }
        }
    }
}
