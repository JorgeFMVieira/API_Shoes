using JorgeShoes.Models;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IProductTypeService
    {
        Task<ProductTypeResponse> GetProductsType(int page, float entries, string search, string searchBy);
    }
}
