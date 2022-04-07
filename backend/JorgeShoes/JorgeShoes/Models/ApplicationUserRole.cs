using Microsoft.AspNetCore.Identity;

namespace JorgeShoes.Models
{
    public class ApplicationUserRole : IdentityUserRole<string>
    {
        public virtual ApplicationUser User { get; set; }
        public virtual ApplicationRoles Roles { get; set; }
    }
}
