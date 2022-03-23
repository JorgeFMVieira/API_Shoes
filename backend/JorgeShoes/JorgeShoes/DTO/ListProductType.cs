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
            Price = product.Price;
            Type = product.Type.Type;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Type { get; set; }

    }
}
