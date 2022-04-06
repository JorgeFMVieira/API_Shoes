using JorgeShoes.Models;

namespace JorgeShoes.DTO
{
    public class ListUserDTO
    {
        public ListUserDTO(UserModel userModel)
        {
            Id = userModel.Id;
            Email = userModel.Email;
            Username = userModel.Username;
            Password = userModel.Password;
            Role = userModel.Role;
            Token = userModel.token;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
