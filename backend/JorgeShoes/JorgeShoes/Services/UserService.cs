using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
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
                mostrar.Pages = ((int)Math.Ceiling(_context.ProductTypes.Where(x => x.DateDeleted == null).Count() / entries));
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

        public async Task CreateUser(CreateUserDTO user)
        {
            try
            {
                user.DateCreated = DateTime.Now;
                _context.User.Add(user.ToEntity());
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
