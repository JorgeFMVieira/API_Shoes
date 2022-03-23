using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IProductTypeService
    {
        Task<ProductTypeResponse> GetProductsType(int page, float entries, string search);
        Task<ProductType> GetProductType(int id);
        Task<ProductType> GetProduct(int id);
        Task<ProductTypeResponse> Create(ProductType productType);
        Task Update(ProductType productType);
        Task Delete(ProductType productType);
    }
}
