using JorgeShoes.Context;
using JorgeShoes.Models;
using JorgeShoes.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JorgeShoes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private IProductService _productService;
        private readonly AppDbContext _context;

        public ProductsController(IProductService productService, AppDbContext context)
        {
            _productService = productService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProducts(int page)
        {
            try
            {
                var products = await _productService.GetProducts(page);
                return Ok(products);
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("ProductById")]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProductsById([FromQuery] int id)
        {
            try
            {
                var products = await _productService.GetProductsById(id);
                if (!products.Any())
                {
                    return NotFound($"We weren´t able to find products with the id of {id}");
                }
                else
                {
                    return Ok(products);
                }
            }
            catch
            {
                return NotFound($"We weren´t able to find products with the id of {id}");
            }
        }


        [HttpGet("ProductByName")]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProductsByName([FromQuery] string name)
        {
            try
            {
                var products = await _productService.GetProductsByName(name);
                if (!products.Any())
                {
                    return NotFound($"We weren´t able to find products with the name of {name}");
                }
                else
                {
                    return Ok(products);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to find products with the name of {name}");
            }
        }

        [HttpGet("{id:int}", Name="GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            try
            {
                var product = await _productService.GetProduct(id);
                if (product == null)
                {
                    return NotFound($"We weren´t able to find products with the id of {id}");
                }
                else
                {
                    return Ok(product);
                }
            }
            catch
            {
                return NotFound($"We weren´t able to find products with the id of {id}"); ;
            }
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<Product>> GetAll(string search)
        {
            try
            {
                var product = await _productService.GetAll(search);
                if (product == null)
                {
                    return NotFound($"We weren´t able to find products with the data: {search}");
                }
                else
                {
                    return Ok(product);
                }
            }
            catch
            {
                return NotFound($"We weren´t able to find products with the data: {search}"); ;
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Product product)
        {
            try
            {
                await _productService.CreateProduct(product);
                return CreatedAtRoute(nameof(GetProduct), new { id = product.Id }, product);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to create a product");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody]Product product)
        {
            try
            {
                if(product.Id == id)
                {
                    await _productService.UpdateProduct(product);
                    return Ok($"Product width id of {id} was updated");
                }
                else
                {
                    return BadRequest("We weren´t able to find an product");
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to edit the product");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            try
            {
                var product = await _productService.GetProduct(id);
                if(product == null)
                {
                    return NotFound($"We weren´t able to find the product with the id of {id}");
                }
                else
                {
                    var delete = await _productService.DeleteProduct(product);
                    if(delete == true)
                    {
                        return Ok(true);
                    }
                        return Ok(false);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to edit the product");
            }
        }

        //[HttpGet("Order")]
        //public async Task<ActionResult<IAsyncEnumerable<Product>>> Order(string option)
        //{
            
        //    try
        //    {
        //        var product = await _productService.Order(option);
        //        return (ActionResult)product;
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}
    }
}
