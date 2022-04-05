using JorgeShoes.Models;

namespace JorgeShoes.DTO
{
    public class CreateUserDTO
    {
        public UserModel ToEntity()
        {
            return new UserModel
            {
                Email = this.Email,
                GivenName = this.GivenName,
                Surname = this.Surname,
                Password = this.Password,
                Role = this.Role,
                Username = this.Username
            };
        }

        public string Email { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }

    }
}
