using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JorgeShoes.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateEdited { get; set; }

        public DateTimeOffset? DateDeleted { get; set; }

        public static implicit operator List<object>(UserModel v)
        {
            throw new NotImplementedException();
        }
    }
}
