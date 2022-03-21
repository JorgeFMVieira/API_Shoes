using System;
using System.ComponentModel.DataAnnotations;

namespace JorgeShoes.Models
{
    public class ProductType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Type { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateEdited { get; set; }

        public DateTimeOffset? DateDeleted { get; set; }
    }
}
