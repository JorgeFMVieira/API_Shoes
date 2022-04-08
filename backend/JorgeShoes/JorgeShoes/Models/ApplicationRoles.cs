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
        public static readonly Roles Admin = new("Admin", "Admin");
        public static readonly Roles Client = new("Client", "Client");
        protected Roles(string name, string value) : base(name, value)
        {
        }
    }
}
