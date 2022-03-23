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
                Price = this.Price,
                ProductTypeID = this.ProductTypeId
            };
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int ProductTypeId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
