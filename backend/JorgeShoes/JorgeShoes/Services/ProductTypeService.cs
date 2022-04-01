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

        public async Task<ProductTypeResponse> GetProductsType(int page, float entries, string search)
        {
            try
            {
                var pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null).Count() / entries);
                if(search != null)
                {
                    pageCount = Math.Ceiling(_context.ProductTypes
                                    .Where(n => n.DateDeleted == null && n.Type.Contains(search) || n.ProductTypeId.ToString().Contains(search))
                                    .Count() / entries);
                }

                ProductTypeResponse productTypeResponse = new();
                productTypeResponse.Pages = (int)pageCount;
                productTypeResponse.CurrentPage = page;
                productTypeResponse.Entries = entries;
                productTypeResponse.Search = search;

                if(page < 1)
                {
                    productTypeResponse.Error = true;
                    productTypeResponse.ErrorMsg = "The page minium is 1.";
                    return productTypeResponse;
                }

                if(page > pageCount)
                {
                    productTypeResponse.Error = true;
                    productTypeResponse.ErrorMsg = "The page is bigger than the total pages.";
                    return productTypeResponse;
                }

                if(page.ToString() == "")
                {
                    productTypeResponse.Error = true;
                    productTypeResponse.ErrorMsg = "You need to specify a page.";
                    return productTypeResponse;
                }

                if(entries < 1)
                {
                    productTypeResponse.Error = true;
                    productTypeResponse.ErrorMsg = "The minium entries should be 1 in minium.";
                    return productTypeResponse;
                }

                var productsTypes = await _context.ProductTypes
                    .Where(n => n.DateDeleted == null)
                    .Skip((page - 1) * (int)entries)
                    .Take((int)entries)
                    .ToListAsync();

                if(search != null)
                {
                    productsTypes = await _context.ProductTypes
                                    .Where(n => n.DateDeleted == null && n.Type.Contains(search) || n.ProductTypeId.ToString().Contains(search))
                                    .Skip((page - 1) * (int)entries)
                                    .Take((int)entries)
                                    .ToListAsync();
                }

                productTypeResponse.ProductType = productsTypes;
                return productTypeResponse;
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
