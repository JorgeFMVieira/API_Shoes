using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IProductTypeService
    {
        Task<ProductTypeResponse> GetProductTypes(int page, float entries, string searchBy, string search);
        Task<ProductType> GetProductType(int id);
        Task Create(ProductType productType);
        Task Update(ProductType productType);
        Task<bool> Delete(ProductType productType);
    }
}
