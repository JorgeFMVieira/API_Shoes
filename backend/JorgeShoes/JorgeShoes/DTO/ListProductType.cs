using JorgeShoes.Models;

namespace JorgeShoes.DTO
{
    public class ListProductType
    {
        public ListProductType(Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Description = product.Description;
            Quantity = product.Quantity;
            Price = product.Price;
            Type = product.Type.Type;
            ProductTypeId = product.Type.ProductTypeId;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Type { get; set; }
        public int ProductTypeId { get; set; }

    }
}
