using JorgeShoes.Models;

namespace JorgeShoes.DTO
{
    public class ProductTypeDTO
    {
        public ProductTypeDTO(ProductType productType)
        {
            ProductTypeId = productType.ProductTypeId;
            Type = productType.Type;
        }

        public int ProductTypeId { get; set; }
        public string Type { get; set; }
    }
}
