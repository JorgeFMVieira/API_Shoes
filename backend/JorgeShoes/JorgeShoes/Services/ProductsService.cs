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


        public async Task<ProductResponse> GetProducts(int page, float entries, string searchBy, string search, string order, string option)
        {
            try
            {
                var pageCount = Math.Ceiling(_context.Products.Include(x => x.Type).Where(n => n.DateDeleted == null).Count() / entries);
                if (search != null)
                {
                    if (searchBy == "all")
                    {
                        pageCount = Math.Ceiling(_context.Products.Include(x => x.Type).Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Type.Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search) || n.Quantity.ToString().Contains(search))).Count() / entries);
                    }
                    else if(searchBy == "name")
                    {
                        pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null && n.Name.Contains(search)).Count() / entries);
                    }
                    else if (searchBy == "type")
                    {
                        pageCount = Math.Ceiling(_context.Products.Include(x => x.Type).Where(n => n.DateDeleted == null && n.Type.Type.Contains(search)).Count() / entries);
                    }
                    else
                    {
                        pageCount = Math.Ceiling(_context.Products.Include(x => x.Type).Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Type.Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search) || n.Quantity.ToString().Contains(search))).Count() / entries);
                    }
                }

                var products = _context.Products
                                .Include(x => x.Type)
                                .Where(n => n.DateDeleted == null)
                                .Skip((page - 1) * (int)entries)
                                .Take((int)entries);

                if (search != null)
                {
                    if(searchBy == "all")
                    {
                        products = _context.Products
                        .Include(x => x.Type)
                        .Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Type.Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search) || n.Quantity.ToString().Contains(search)))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries);
                    }else if(searchBy == "name")
                    {
                        products = _context.Products
                        .Where(n => n.DateDeleted == null && n.Name.Contains(search))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries);
                    }
                    else if (searchBy == "type")
                    {
                        products = _context.Products
                        .Include(x => x.Type)
                        .Where(n => n.DateDeleted == null && n.Type.Type.Contains(search))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries);
                    }
                    else
                    {
                        products = _context.Products
                        .Include(x => x.Type)
                        .Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Type.Type.Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search) || n.Quantity.ToString().Contains(search)))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries);
                    }
                }

                switch (option)
                {
                    case "id_desc":
                        products = _context.Products.OrderByDescending(s => s.Id);
                        break;
                    case "name":
                        products = _context.Products.OrderBy(s => s.Name);
                        break;
                    case "name_desc":
                        products = _context.Products.OrderByDescending(s => s.Name);
                        break;
                    case "description":
                        products = _context.Products.OrderBy(s => s.Description);
                        break;
                    case "description_desc":
                        products = _context.Products.OrderByDescending(s => s.Description);
                        break;
                    case "price":
                        products = _context.Products.OrderBy(s => s.Price);
                        break;
                    case "price_desc":
                        products = _context.Products.OrderByDescending(s => s.Price);
                        break;
                    default:
                        products = _context.Products.OrderBy(s => s.Id);
                        break;
                }

                products = await _context.Products.AsQueryable()
                                                  .ToListAsync();

                ProductResponse produto = new();
                produto.Products = products.Select(t => new ListProductType(t)).ToList();
                produto.Pages = (int)pageCount;
                produto.CurrentPage = page;
                produto.Entries = entries;
                produto.Search = search;
                produto.SearchBy = searchBy;
                produto.Order = order;

                if (page < 1)
                {
                    produto.Success = false;
                    produto.Erro = "The page minium is 1";
                    return produto;
                }

                return produto;
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
