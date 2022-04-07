using JorgeShoes.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;

namespace JorgeShoes.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}
