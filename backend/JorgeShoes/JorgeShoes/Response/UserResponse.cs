using JorgeShoes.DTO;
using System.Collections.Generic;

namespace JorgeShoes.Response
{
    public class UserResponse
    {
            public UserResponse(string errorMsg, bool error)
            {
                ErrorMsg = errorMsg;
                Error = error;
            }

            public UserResponse()
            {
                User = new List<ListUserDTO>();
            }

            public List<ListUserDTO> User { get; set; }

            public string ErrorMsg { get; set; }
            public bool Error { get; set; }
            public int Pages { get; set; }
            public string Order { get; set; }
            public string SearchBy { get; set; }
            public float Entries { get; set; }
            public int CurrentPage { get; set; }
            public string Search { get; set; }
    }
}
