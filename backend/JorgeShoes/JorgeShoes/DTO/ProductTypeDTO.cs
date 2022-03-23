using JorgeShoes.Models;

namespace JorgeShoes.DTO
{
    public class ProductTypeDTO
    {
        public ProductTypeDTO(ProductType productType)
        {
            Id = productType.ProductTypeID;
            Type = productType.Type;
        }

        public int Id { get; set; }
        public string Type { get; set; }
    }
}
