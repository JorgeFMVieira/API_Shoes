using JorgeShoes.Models;
using System;

namespace JorgeShoes.DTO
{
    public class CreateUserDTO
    {
        public UserModel ToEntity()
        {
            return new UserModel
            {
                Email = this.Email,
                Password = this.Password,
                Role = this.Role,
                Username = this.Username,
                DateCreated = this.DateCreated
            };
        }

        public string Email { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public DateTime DateCreated { get; set; }

    }
}
