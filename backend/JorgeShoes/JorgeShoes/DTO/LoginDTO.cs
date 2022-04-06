using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes.DTO
{
    public class LoginDTO
    {
        public LoginDTO(UserModel userModel)
        {
            Id = userModel.Id;
            Email = userModel.Email;
            Username = userModel.Username;
            Role = userModel.Role;
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

    }
}
