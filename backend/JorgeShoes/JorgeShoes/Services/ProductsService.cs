using JorgeShoes.Context;
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


        public async Task<ProductResponse> GetProducts(int page)
        {
            try
            {
                var pageResults = 15f;
                var pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null).Count() / pageResults);

                ProductResponse produto = new ProductResponse();
                produto.Pages = (int)pageCount;
                produto.CurrentPage = page;

                if (page > pageCount)
                {
                    produto.Success = false;
                    produto.Erro = "A página é maior que o total";
                return produto;
                }


                if (page < 1)
                {
                    produto.Success = false;
                    produto.Erro = "A página é menor que 1";
                    return produto;
                }
                    


                var products = await _context.Products
                    .Where(n => n.DateDeleted == null)
                    .Skip((page - 1) * (int)pageResults)
                    .Take((int)pageResults)
                    .ToListAsync();

                produto.Products = products;

                return produto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProductResponse> GetProductsByName(int page, string name)
        {
            try 
            {
                var pageResults = 15f;
                var pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null && n.Name.Contains(name)).Count() / pageResults);

                ProductResponse produto = new ProductResponse();
                produto.Pages = (int)pageCount;
                produto.CurrentPage = page;

                if (page > pageCount)
                {
                    produto.Success = false;
                    produto.Erro = "A página é maior que o total";
                    return produto;
                }


                if (page < 1)
                {
                    produto.Success = false;
                    produto.Erro = "A página é menor que 1";
                    return produto;
                }

                var products = await _context.Products
                    .Where(n => n.DateDeleted == null && n.Name.Contains(name))
                    .Skip((page - 1) * (int)pageResults)
                    .Take((int)pageResults)
                    .ToListAsync();

                produto.Products = products;

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

        public async Task CreateProduct(Product product)
        {
            product.DateCreated = DateTime.Now;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            product.DateCreated = DateTime.Now;
            _context.Entry(product).State = EntityState.Modified;
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

        public async Task<IEnumerable<Product>> GetProductsById(int id)
        {
            IEnumerable<Product> products;
            if (!string.IsNullOrEmpty(id.ToString()))
            {
                products = await _context.Products.Where(b => b.Id.ToString().Contains(id.ToString())).ToListAsync();
            }
            else
            {
                products = await _context.Products.ToListAsync();
            }
            return products;
        }

        public async Task<IEnumerable<Product>> GetAll(string search)
        {
            IEnumerable<Product> products;
            if (!string.IsNullOrEmpty(search)) 
            { 
                products = await _context.Products.Where(n => n.Id.ToString().Contains(search.ToString()) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search.ToString())).ToListAsync();
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
