using System.ComponentModel.DataAnnotations;

namespace JorgeShoes.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(80)]
        public string Name { get; set; }

        [Required]
        [StringLength(300)]
        public string Description { get; set; }

        [Required]
        public int Price { get; set; }
    }
}
