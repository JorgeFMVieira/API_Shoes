using JorgeShoes.Context;
using JorgeShoes.Models;
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

        public async Task<ProductTypeResponse> GetProductTypes(int page, float entries, string searchBy, string search)
        {
            try
            {
                var pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null).Count() / entries);
                if(search != null)
                {
                    if(searchBy == "all")
                    {
                        pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search))).Count() / entries);
                    }
                    else if(searchBy == "id")
                    {
                        pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search))).Count() / entries);
                    }
                    else if(searchBy == "type")
                    {
                        pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null && (n.Type.ToString().Contains(search))).Count() / entries);
                    }
                    else
                    {
                        pageCount = Math.Ceiling(_context.ProductTypes.Where(n => n.DateDeleted == null).Count() / entries);
                    }
                }

                ProductTypeResponse produtoType = new();
                produtoType.Pages = (int)pageCount;
                produtoType.CurrentPage = page;
                produtoType.Entries = entries;
                produtoType.SearchBy = searchBy;
                produtoType.Search = search;

                var productsTypes = await _context.ProductTypes
                                    .Where(n => n.DateDeleted == null)
                                    .Skip((page - 1) * (int)entries)
                                    .Take((int)entries)
                                    .ToListAsync();

                if (search != null)
                {
                    if (searchBy == "all")
                    {
                        productsTypes = await _context.ProductTypes
                                    .Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Contains(search)))
                                    .Skip((page - 1) * (int)entries)
                                    .Take((int)entries)
                                    .ToListAsync();
                    }
                    else if (searchBy == "id")
                    {
                        productsTypes = await _context.ProductTypes
                                    .Where(n => n.DateDeleted == null && n.Id.ToString().Contains(search))
                                    .Skip((page - 1) * (int)entries)
                                    .Take((int)entries)
                                    .ToListAsync();
                    }
                    else if (searchBy == "type")
                    {
                        productsTypes = await _context.ProductTypes
                                    .Where(n => n.DateDeleted == null && n.Type.Contains(search))
                                    .Skip((page - 1) * (int)entries)
                                    .Take((int)entries)
                                    .ToListAsync();
                    }
                    else
                    {
                        productsTypes = await _context.ProductTypes
                                    .Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Contains(search)))
                                    .Skip((page - 1) * (int)entries)
                                    .Take((int)entries)
                                    .ToListAsync();
                    }
                }

                produtoType.ProductType = productsTypes;
                return produtoType;
            }
            catch
            {
                throw;
            }
        }

        public async Task Create(ProductType productType)
        {
            try
            {
                productType.DateCreated = DateTime.Now;
                _context.ProductTypes.Add(productType);
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Delete(ProductType productType)
        {
            try
            {
                productType.DateDeleted = DateTime.Now;
                _context.Entry(productType).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
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

        public async Task<ProductType> GetProductType(int id)
        {
            var productType = await _context.ProductTypes.FindAsync(id);
            return productType;
        }
    }
}
