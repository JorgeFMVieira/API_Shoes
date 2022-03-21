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


        public async Task<ProductResponse> GetProducts(int page, float entries, string searchBy, string search)
        {
            try
            {
                var pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null).Count() / entries);
                if (search != null)
                {
                    if (searchBy == "all")
                    {
                        pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search))).Count() / entries);
                    }
                    else if(searchBy == "name")
                    {
                        pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null && n.Name.Contains(search)).Count() / entries);
                    }
                    else if (searchBy == "id")
                    {
                        pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null && n.Id.ToString().Contains(search)).Count() / entries);
                    }
                    else
                    {
                        pageCount = Math.Ceiling(_context.Products.Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search))).Count() / entries);
                    }
                }
                

                ProductResponse produto = new ProductResponse();
                produto.Pages = (int)pageCount;
                produto.CurrentPage = page;
                produto.Entries = entries;
                produto.Search = search;

                //if (page > pageCount)
                //{
                //    produto.Success = false;
                //    produto.Erro = "";
                //    return produto;
                //}


                if (page < 1)
                {
                    produto.Success = false;
                    produto.Erro = "The page minium is 1";
                    return produto;
                }

                var products = await _context.Products
                                .Where(n => n.DateDeleted == null)
                                .Skip((page - 1) * (int)entries)
                                .Take((int)entries)
                                .ToListAsync();
                if (search != null)
                {
                    if(searchBy == "all")
                    {
                        products = await _context.Products
                        .Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search)))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries)
                        .ToListAsync();
                    }else if(searchBy == "name")
                    {
                        products = await _context.Products
                        .Where(n => n.DateDeleted == null && n.Name.Contains(search))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries)
                        .ToListAsync();
                    }
                    else if (searchBy == "id")
                    {
                        products = await _context.Products
                        .Where(n => n.DateDeleted == null && n.Id.ToString().Contains(search))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries)
                        .ToListAsync();
                    }
                    else
                    {
                        products = await _context.Products
                        .Where(n => n.DateDeleted == null && (n.Id.ToString().Contains(search) || n.Name.Contains(search) || n.Description.Contains(search) || n.Price.ToString().Contains(search)))
                        .Skip((page - 1) * (int)entries)
                        .Take((int)entries)
                        .ToListAsync();
                    }
                }

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
            product.DateEdited = DateTime.Now;
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
