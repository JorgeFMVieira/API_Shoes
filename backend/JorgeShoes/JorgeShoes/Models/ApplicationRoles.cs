using Ardalis.SmartEnum;
using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;

namespace JorgeShoes.Models
{
    public class ApplicationRoles : IdentityRole
    {
        public ApplicationRoles()
        {

        }

        public ApplicationRoles(string roleName) : base(roleName)
        {
        }

        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }

    public sealed class Roles : SmartEnum<Roles, string>
    {
        public static readonly Roles roles = new("Admin", "Client");
        protected Roles(string name, string value) : base(name, value)
        {
        }
    }
}
