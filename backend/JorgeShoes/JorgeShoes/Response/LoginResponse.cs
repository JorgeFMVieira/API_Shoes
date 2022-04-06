using JorgeShoes.DTO;
using JorgeShoes.Models;
using System.Collections.Generic;

namespace JorgeShoes.Response
{
    public class LoginResponse
    {
            public LoginResponse(string errorMsg, bool error)
            {
                ErrorMsg = errorMsg;
                Error = error;
            }

            public LoginResponse()
            {
                User = new List<UserModel>();
                Token = "";
            }

            public List<UserModel> User { get; set; }

            public string ErrorMsg { get; set; }
            public bool Error { get; set; }
            public string Token { get; set; }
        }
}
