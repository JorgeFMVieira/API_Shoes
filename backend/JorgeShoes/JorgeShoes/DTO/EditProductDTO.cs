using JorgeShoes.Models;
using System;

namespace JorgeShoes.DTO
{
    public class EditProductDTO
    {
        public Product ToEntity()
        {
            return new Product
            {
                Id = this.Id,
                Name = this.Name,
                Description = this.Description,
                Quantity = this.Quantity,
                Price = this.Price,
                ProductTypeId = this.ProductTypeId,
                DateEdited = this.DateEdited
            };
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int ProductTypeId { get; set; }
        public DateTime DateEdited { get; set; }
    }
}
