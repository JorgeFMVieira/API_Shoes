using JorgeShoes.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public class ProductTypeService : IProductTypeService
    {
        private readonly AppDbContext _context;
        public ProductTypeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProductTypeResponse> GetProductsType(int page, float entries, string searchBy, string search)
        {
            try
            {
                var pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null).Count() / entries);

                ProductTypeResponse productTypeResponse = new();
                productTypeResponse.Pages = (int)pageCount;
                productTypeResponse.CurrentPage = page;
                productTypeResponse.Entries = entries;
                productTypeResponse.Search = search;

                var productsTypes = await _context.ProductTypes
                    .Where(n => n.DateDeleted == null)
                    .Skip((page - 1) * (int)entries)
                    .Take((int)entries)
                    .ToListAsync();

                productTypeResponse.ProductType = productsTypes;
                return productTypeResponse;
            }
            catch
            {
                throw;
            }
        }
    }
}
