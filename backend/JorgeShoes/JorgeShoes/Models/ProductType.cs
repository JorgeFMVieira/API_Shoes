using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JorgeShoes.Models
{
    public class ProductType
    {

        [Key]
        public int ProductTypeID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Type { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateEdited { get; set; }

        public DateTimeOffset? DateDeleted { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
