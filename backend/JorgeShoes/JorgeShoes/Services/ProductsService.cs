using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace JorgeShoes.Services
{
    public class ProductsService : IProductService
    {

        private readonly AppDbContext _context;

        public ProductsService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<ProductResponse> GetProducts(int page, float entries, string searchBy, string search, string order)
        {
            try
            {
                var mostrar = new ProductResponse();

                IQueryable<Product> products = _context.Products.Include(t => t.Type).Where(x => x.DateDeleted == null);

                if (search != null)
                    switch (searchBy)
                    {
                        case "all":
                            products = products.Where(n => (n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Type.Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search) || n.Quantity.ToString().Contains(search))));
                            break;
                        case "name":
                            products = products.Where(n => (n.Name.Contains(search) && n.DateDeleted == null));
                            break;
                        case "type":
                            products = products.Where(n => (n.DateDeleted == null && n.Type.Type.Contains(search)));
                            break;
                        default:
                            break;
                    }

                products = order switch
                {
                    "Id" => products.OrderBy(c => c.Id),
                    "Id_desc" => products.OrderByDescending(c => c.Id),
                    "Name" => products.OrderBy(c => c.Name),
                    "Name_desc" => products.OrderByDescending(c => c.Name),
                    "Price" => products.OrderBy(p => p.Price),
                    "Price_desc" => products.OrderByDescending(c => c.Price),
                    "Quantity" => products.OrderBy(p => p.Quantity),
                    "Quantity_desc" => products.OrderByDescending(c => c.Quantity),
                    "Description" => products.OrderBy(p => p.Description),
                    "Description_desc" => products.OrderByDescending(c => c.Description),
                    "Type" => products.OrderBy(p => p.Type.Type),
                    "Type_desc" => products.OrderByDescending(c => c.Type.Type),

                    _ => products.OrderBy(c => c.Id),
                };

                products = products
                       .Skip((page - 1) * (int)entries)
                       .Take((int)entries);

                mostrar.Products = await products.Select(t => new ListProduct(t)).ToListAsync();
                mostrar.CurrentPage = page;
                mostrar.Order = order;
                mostrar.Pages = ((int)Math.Ceiling(_context.Products.Where(x => x.DateDeleted == null).Count() / entries));
                mostrar.Entries = entries;
                mostrar.Search = search;
                mostrar.SearchBy = searchBy;
                return mostrar;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product;
        }

        public async Task CreateProduct(CreateDTO product)
        {
            product.DateCreated = DateTime.Now;
            _context.Products.Add(product.ToEntity());
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(EditProductDTO product)
        {
            product.DateEdited = DateTime.Now;
            _context.Entry(product.ToEntity()).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteProduct(Product product)
        {
            try
            {
                product.DateDeleted = DateTime.Now;
                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw new Exception();
            }
        }

        public async Task<IEnumerable<Product>> GetAll(string search)
        {
            IEnumerable<Product> products;
            if (!string.IsNullOrEmpty(search)) 
            { 
                products = await _context.Products.Where(n => n.Id.ToString().Contains(search.ToString()) || n.Quantity.ToString().Contains(search.ToString()) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search.ToString())).ToListAsync();
            }
            else
            {
                    products = await _context.Products.ToListAsync();
            }
            return products;
        }

        //public async Task<IEnumerable<Product>> Order(string option)
        //{

        //    var produtos = from s in _context.Products
        //                   select s;
        //    switch (option)
        //    {
        //        case "id_desc":
        //            produtos = produtos.OrderByDescending(s => s.Id);
        //            break;
        //        case "name":
        //            produtos = produtos.OrderBy(s => s.Name);
        //            break;
        //        case "name_desc":
        //            produtos = produtos.OrderByDescending(s => s.Name);
        //            break;
        //        case "description":
        //            produtos = produtos.OrderBy(s => s.Description);
        //            break;
        //        case "description_desc":
        //            produtos = produtos.OrderByDescending(s => s.Description);
        //            break;
        //        case "price":
        //            produtos = produtos.OrderBy(s => s.Price);
        //            break;
        //        case "price_desc":
        //            produtos = produtos.OrderByDescending(s => s.Price);
        //            break;
        //        default:
        //            produtos = produtos.OrderBy(s => s.Id);
        //            break;
        //    }
        //    return await produtos.AsNoTracking().ToListAsync();
        //}
    }
}
