using JorgeShoes.Context;
using JorgeShoes.DTO;
using JorgeShoes.Models;
using JorgeShoes.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JorgeShoes.Controllers;
using System.Security.Claims;

namespace JorgeShoes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProducts(int page, float entries, string searchBy, string search, string order)
        {
            try
            {
                var products = await _productService.GetProducts(page, entries, searchBy, search, order);
                return Ok(products);
            }
            catch
            {
                throw;
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

        [HttpPost]
        public async Task<ActionResult> Create(CreateDTO product)
        {
            try
            {
                await _productService.CreateProduct(product);
                return Ok(product);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"We weren´t able to create a product");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody]EditProductDTO product)
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
    }
}
