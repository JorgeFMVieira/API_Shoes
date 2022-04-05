using System.Collections.Generic;

namespace JorgeShoes.Models
{
    public class UserConstants
    {
        public static List<UserModel> Users = new List<UserModel>()
        {
            new UserModel()
            {
                Username = "jorge10",
                Email = "jorge@gmail.com",
                Password = "1234",
                GivenName = "Jorge",
                Surname = "Vieira",
                Role = "Client",
            },
            new UserModel()
            {
                Username = "josh",
                Email = "josh@gmail.com",
                Password = "1234",
                GivenName = "Josh",
                Surname = "Hills",
                Role = "Admin",
            },
        };
    }
}
