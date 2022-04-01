using JorgeShoes.DTO;
using JorgeShoes.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public interface IProductService
    {
        Task<ProductResponse> GetProducts(int page, float entries, string searchBy, string search, string order);
        Task<Product> GetProduct(int id);
        Task CreateProduct(CreateDTO product);
        Task UpdateProduct(EditProductDTO product);
        Task<bool> DeleteProduct(Product product);
    }
}