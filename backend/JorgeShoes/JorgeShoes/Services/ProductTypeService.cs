using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<List<ProductTypeDTO>> GetAllType()
        {
            var table = await _context.ProductTypes.Where(n => n.DateDeleted == null)
                    .Select(x => new ProductTypeDTO(x))    
                    .ToListAsync();
            return table;
        }

        public async Task<ProductTypeResponse> GetProductsType(int page, float entries, string search, string searchBy, string order)
        {
            try
            {
                var mostrar = new ProductTypeResponse();

                IQueryable<ProductType> products = _context.ProductTypes.Where(x => x.DateDeleted == null);

                if (search != null)
                {
                    switch (searchBy)
                    {
                        case "Id":
                            products = products.Where(n => (n.DateDeleted == null && n.ProductTypeId.ToString().Contains(search)));
                            break;
                        default:
                            products = products.Where(n => (n.DateDeleted == null && n.Type.Contains(search)));
                            break;
                    }
                }

                products = order switch
                {
                    "Id" => products.OrderBy(c => c.ProductTypeId),
                    "Id_desc" => products.OrderByDescending(c => c.ProductTypeId),
                    "Type" => products.OrderBy(c => c.Type),
                    "Type_desc" => products.OrderByDescending(c => c.Type),

                    _ => products.OrderBy(c => c.ProductTypeId),
                };

                products = products
                       .Skip((page - 1) * (int)entries)
                       .Take((int)entries);

                mostrar.ProductType = await products.Select(t => new ProductTypeDTO(t)).ToListAsync();
                mostrar.CurrentPage = page;
                mostrar.Order = order;
                mostrar.Pages = ((int)Math.Ceiling(_context.ProductTypes.Where(x => x.DateDeleted == null).Count() / entries));
                mostrar.Entries = entries;
                mostrar.SearchBy = searchBy;
                mostrar.Search = search;
                return mostrar;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProductType> GetProductType(int id)
        {
            var product = await _context.ProductTypes.FindAsync(id);
            return product;
        }

        public async Task<ProductTypeResponse> Create(ProductType productType)
        {
            try
            {
                ProductTypeResponse productTypeResponse = new();
                var checkExist = _context.ProductTypes.Where(x => x.Type == productType.Type && x.DateDeleted == null);
                if (checkExist.Any())
                {
                    productTypeResponse.Error = true;
                    productTypeResponse.ErrorMsg = "That product type already exists.";
                    return productTypeResponse;
                }
                else
                {
                    productType.DateCreated = DateTime.Now;
                    _context.ProductTypes.Add(productType);
                    await _context.SaveChangesAsync();
                }
                return productTypeResponse;
            }
            catch
            {
                throw;
            }
        }

        public async Task Update(ProductType productType)
        {
            try
            {
                productType.DateEdited = DateTime.Now;
                _context.Entry(productType).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task Delete(ProductType productType)
        {
            try
            {
                productType.DateDeleted = DateTime.Now;
                _context.Entry(productType).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
