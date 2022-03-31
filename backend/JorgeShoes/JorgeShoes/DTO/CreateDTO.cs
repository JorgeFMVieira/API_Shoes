using JorgeShoes.Models;
using System;

namespace JorgeShoes.DTO
{
    public class CreateDTO
    {
        public Product ToEntity()
        {
            return new Product
            {
                Name = this.Name,
                Description = this.Description,
                Quantity = this.Quantity,
                Price = this.Price,
                ProductTypeId = this.ProductTypeId,
                DateCreated = this.DateCreated
            };
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int ProductTypeId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
