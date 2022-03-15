using JorgeShoes.Context;
using JorgeShoes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<ActionResult<List<Product>>> GetProducts(int page)
        {
            try
            {
                var pageResults = 3f;
                var pageCount = Math.Ceiling(_context.Products.Count() / pageResults);

                if (page > pageCount)
                    throw new Exception();

                if(page <= 0)
                    throw new Exception();

                var products = await _context.Products
                    .Skip((page - 1) * (int)pageResults)
                    .Take((int)pageResults)
                    .ToListAsync();


                var response = new ProductResponse
                {
                    Products = products,
                    CurrentPage = page,
                    Pages = (int)pageCount
                };

                return (products);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Product>> GetProductsByName(string name)
        {
            IEnumerable<Product> products;
            if (!string.IsNullOrEmpty(name))
            {
                products = await _context.Products.Where(n => n.Name.Contains(name)).ToListAsync();
            }
            else
            {
                products = await _context.Products.ToListAsync();
            }
            return products;
        }


        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product;
        }

        public async Task CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
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
    }

    internal struct NewStruct
    {
        public List<Product> first;
        public int middle;
        public double last;

        public NewStruct(List<Product> first, int middle, double last)
        {
            this.first = first;
            this.middle = middle;
            this.last = last;
        }

        public override bool Equals(object obj)
        {
            return obj is NewStruct other &&
                   EqualityComparer<List<Product>>.Default.Equals(first, other.first) &&
                   middle == other.middle &&
                   last == other.last;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(first, middle, last);
        }

        public void Deconstruct(out List<Product> first, out int middle, out double last)
        {
            first = this.first;
            middle = this.middle;
            last = this.last;
        }

        public static implicit operator (List<Product> first, int middle, double last)(NewStruct value)
        {
            return (value.first, value.middle, value.last);
        }

        public static implicit operator NewStruct((List<Product> first, int middle, double last) value)
        {
            return new NewStruct(value.first, value.middle, value.last);
        }
    }
}
